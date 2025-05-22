const express = require("express");
const body_parser = require("body-parser");
const mysql = require("mysql2");

let app = express();

app.use(body_parser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "Saloni",
  password: "Saloni@77388",
  database: "benefit_illustration",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database successfully!");
});

connection.query(
  `
            CREATE TABLE IF NOT EXISTS policy_detail (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            dob DATE NOT NULL,
            gender VARCHAR(255) NOT NULL,
            policy_type VARCHAR(255) NOT NULL,
            sum_assured INT NOT NULL,
            premium_frequency VARCHAR(255) NOT NULL,
            modal_premium INT NOT NULL,
            policy_term INT NOT NULL,
            premium_payment_term INT NOT NULL,
            start_date DATE,
            riders VARCHAR(255)
            )`,
  (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      return;
    }
    console.log("Query results: ", results);
  }
);

app.listen(3002);
