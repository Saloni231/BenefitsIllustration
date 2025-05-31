const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();
const db = require("../db");

loginRouter.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const userQuery = "SELECT * FROM policy_details WHERE username = ?";

  db.query(userQuery, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const user = results[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Login successful." });
  });
});

module.exports = loginRouter;
