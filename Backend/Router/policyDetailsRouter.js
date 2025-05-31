const express = require("express");
const db = require("../db");
const decrypt = require("../util/Decryption");

const policyDetailsRouter = express.Router();

policyDetailsRouter.get("/", (req, res) => {
  const userId = req.user.id;

  const findQuery = "SELECT * FROM policy_details WHERE id = ?";

  db.query(findQuery, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found." });

    const {
      name: hashedName,
      dob: hashedDOB,
      gender: hashedGender,
      sum_assured,
      modal_premium,
      premium_frequency,
      policy_term,
      premium_payment_term,
    } = result[0];

    const name = decrypt(hashedName);
    const dob = decrypt(hashedDOB);
    const gender = decrypt(hashedGender);

    const response = {
      name,
      dob,
      gender,
      sum_assured,
      modal_premium,
      premium_frequency,
      policy_term,
      premium_payment_term,
    };

    res.status(200).json({ response });
  });
});

module.exports = policyDetailsRouter;
