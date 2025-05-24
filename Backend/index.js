const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { Client } = require("pg");

const login = require("./Router/loginRouter");
const register = require("./Router/RegisterRouter");

let app = express();

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "benefitIllustartion",
  password: "Saloni@77388",
  port: 5432, // Default PostgreSQL port
};


// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "Saloni",
//   password: "Saloni@77388",
//   database: "benefit_illustration",
// });

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/login", login);
app.use("/register",register);
// app.use("/policyCalculation");
// app.use("/illustration");

const client = new Client(dbConfig);

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("connection error ", err));

// const createTableQuery = `
//             CREATE TABLE IF NOT EXISTS policy_detail (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             dob DATE NOT NULL,
//             gender VARCHAR(255) NOT NULL,
//             policy_type VARCHAR(255) NOT NULL,
//             sum_assured INT NOT NULL,
//             premium_frequency VARCHAR(255) NOT NULL,
//             modal_premium INT NOT NULL,
//             policy_term INT NOT NULL,
//             premium_payment_term INT NOT NULL,
//             start_date DATE,
//             riders VARCHAR(255)
//             )`;
const createTableQuery = `
            CREATE TABLE IF NOT EXISTS policy_detail (
            id SERIAL PRIMARY KEY,
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
            )`;
client
  .query(createTableQuery)
  .then(() => console.log("Table created successfully"))
  .catch((err) => console.error("Error creating table ", err));

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database: ", err);
//     return;
//   }
//   console.log("Connected to database successfully!");
// });

// connection.query(createTableQuery,
//   (err, results) => {
//     if (err) {
//       console.error("Error executing query: ", err);
//       return;
//     }
//     console.log("Query results: ", results);
//   }
// );

app.listen(3002);
