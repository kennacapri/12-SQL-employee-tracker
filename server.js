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

};
const Department = require("./Department");

class Role {
    constructor(title, salary) {
        this.title = title;
        this.salary = salary;
        this.department = new Department();
    }
}

module.exports = Role;

const Role = require("./Role");

class Employee {
    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }
}
class Department {
    constructor(name) {
        this.name = name;
    }
}

module.exports = Department;


async function start() {
  try {
    const todo = await inquirer.prompt({
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "Add Employee",
        "Add Role",
        "Add Department",
      ],
    });
    const { userChoice } = todo;
    switch (userChoice) {
      case "View all Employees":
        await helpers.viewAll(connection);
        await start();
        break;
      case "View all Employees by Department":
        await helpers.viewByDept(connection);
        await start();
        break;
      case "Add Employee":
        await helpers.addEmployee(connection);
        await start();
        break;
      case "Add Role":
        await helpers.addRole(connection);
        await start();
        break;
        
      case "Add Dept":
        await helpers.addDept(connection);
        await start();
        break;

      default:
        break;
    }
    return userChoice;
  } catch (err) {
    throw err;
  }
}
