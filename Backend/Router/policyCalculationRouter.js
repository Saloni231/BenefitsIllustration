const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const policyCalculationRouter = express.Router();
const db = require("../db");

policyCalculationRouter.get("/", (req, res) => {
  const userId = req.user.id;

  const findQuery = "SELECT * FROM policy_details WHERE id = ?";

  db.query(findQuery, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found." });

    console.log(result);
  });
});

module.exports = policyCalculationRouter;
