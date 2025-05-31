require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const db = require("./db");

const login = require("./Router/loginRouter");
const register = require("./Router/RegisterRouter");
const policyDetails = require("./Router/policyDetailsRouter");
const illustration = require("./Router/illustrationRouter");
const policyCalculation = require("./Router/policyCalculationRouter");
const auth = require("./middleware/auth");

let app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

app.get("/auth/validate", auth, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

app.use("/login", login);
app.use("/register", register);
app.use("/policyDetails", auth, policyDetails);
app.use("/policyCalculation", auth, policyCalculation);
app.use("/illustration", auth, illustration);

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS policy_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    mobile VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    policy_type VARCHAR(100) NOT NULL,
    sum_assured INT NOT NULL,
    modal_premium INT NOT NULL,
    premium_frequency VARCHAR(50) NOT NULL CHECK (premium_frequency IN ('Yearly', 'Half-Yearly', 'Monthly')),
    policy_term INT NOT NULL CHECK (policy_term BETWEEN 10 AND 20),
    premium_payment_term INT NOT NULL CHECK (premium_payment_term BETWEEN 5 AND 10),
    start_date DATE,
    riders VARCHAR(255)
);
`;

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database successfully!");
});

db.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Error executing query: ", err);
    return;
  }
  console.log("Query results: ", results);
});

module.exports = app;
