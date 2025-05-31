const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerRouter = express.Router();

const db = require("../db");

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const encryptData = (data) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    Buffer.from(process.env.IV, "hex")
  );
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

async function postPolicyDetails(req, res) {
  const requiredFields = [
    "name",
    "mobile",
    "dob",
    "gender",
    "password",
    "confirmPassword",
    "policyType",
    "sumAssured",
    "premiumFrequency",
    "modalPremium",
    "policyTerm",
    "premiumPaymentTerm",
  ];

  for (const field of requiredFields) {
    if (!req.body[field] || String(req.body[field]).trim() === "") {
      return res.status(400).json({ message: `Field "${field}" is required.` });
    }
  }

  // Additional check: password match
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password do not match." });
  }

  const premiumPaymentTerm = Number(req.body.premiumPaymentTerm);
  if (
    isNaN(premiumPaymentTerm) ||
    premiumPaymentTerm < 5 ||
    premiumPaymentTerm > 10
  ) {
    return res.status(400).json({
      message: "Premium Payment Term (PPT) must be between 5 and 10 years.",
    });
  }

  const policyTerm = Number(req.body.policyTerm);
  if (isNaN(policyTerm) || policyTerm < 10 || policyTerm > 20) {
    return res
      .status(400)
      .json({ message: "Policy Term (PT) must be between 10 and 20 years." });
  }

  if (policyTerm < premiumPaymentTerm) {
    return res.status(400).json({
      message:
        "Policy Term (PT) must be greater than Premium Payment Term (PPT).",
    });
  }

  const premium = Number(req.body.modalPremium);
  if (isNaN(premium) || premium < 10000 || premium > 50000) {
    return res.status(400).json({
      message: "Modal Premium must be between ₹10,000 and ₹50,000.",
    });
  }

  const premiumFrequency = req.body.premiumFrequency;
  const allowedFrequencies = ["Yearly", "Half-Yearly", "Monthly"];
  if (!allowedFrequencies.includes(premiumFrequency)) {
    return res.status(400).json({
      message: "Premium Frequency must be Yearly, Half-Yearly, or Monthly.",
    });
  }

  const sumAssured = Number(req.body.sumAssured);
  const minimumRequired = Math.max(500000, premium * 10);
  if (sumAssured < minimumRequired) {
    return res.status(400).json({
      message: `Sum Assured must be at least ₹5,00,000 or 10 times the Modal Premium (₹${minimumRequired}), whichever is higher.`,
    });
  }

  const age = calculateAge(req.body.dob);
  if (age < 23 || age > 56) {
    return res.status(400).json({
      message: `Age must be between 23 and 56. Calculated age is ${age}.`,
    });
  }

  const userExitsQuery = "SELECT * FROM policy_details WHERE username = ?";
  const username = req.body.username;

  db.query(userExitsQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (result.length > 0) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedName = encryptData(req.body.name);
    const hashedMobile = encryptData(req.body.mobile);
    const hashedPassword = encryptData(req.body.password);
    const hashedDOB = encryptData(req.body.dob);
    const hashedGender = encryptData(req.body.gender);

    const dataInsertQuery = `INSERT INTO policy_details (
        name, username, mobile, dob, gender, password, policy_type, sum_assured, 
        premium_frequency, modal_premium, policy_term, premium_payment_term
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [
      hashedName,
      username,
      hashedMobile,
      hashedDOB,
      hashedGender,
      hashedPassword,
      req.body.policyType,
      sumAssured,
      premiumFrequency,
      premium,
      policyTerm,
      premiumPaymentTerm,
    ];

    db.query(dataInsertQuery, values, (err, result) => {
      if (err)
        return res.status(500).json({ message: "Insert Failed", error: err });

      const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600000,
      });

      res.status(201).json({ message: "Registered in successfully!" });
    });
  });
}

registerRouter.post("/", postPolicyDetails);

module.exports = registerRouter;
