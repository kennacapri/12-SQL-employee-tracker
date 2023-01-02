// import and require mysql2
const mysql = require("mysql2");
// import inquirer
const inquirer = require("inquirer");
// import console.table
const cTable = require("console.table");

// requires dotenv file so the password isn't saved
require("dotenv").config();

// connect to database
const connection = mysql.createConnection({
  host: "127.0.0.1", // this was changed from 'localhost' because of use with macOS
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_tracker_db",
});


// throw error if connection fails, if successful log connection in console log
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


// welcome message once connection is established
afterConnection = () => {
  console.log("***********************************");
  console.log("*           WELCOME TO            *");
  console.log("*        EMPLOYEE TRACKER         *");
  console.log("*                                 *");
  console.log("***********************************");
//   promptUser();
};