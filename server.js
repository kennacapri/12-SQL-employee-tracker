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

async function viewAll(cntn) {
    try {
      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "ORDER BY employees.id ASC";
      console.log("Viewing all employees... \n");
      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  async function viewByDept(cntn) {
    try {
      const selectDept = await inquirer.prompt({
        type: "list",
        name: "viewDept",
        message: "Which department would you like to view?",
        choices: ["Engineering", "Finance", "Sales", "Legal"],
      });
      const { viewDept } = selectDept;

      const deptChoice = this.handleDept(viewDept);

      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "WHERE roles.department_id = " + deptChoice;
      query += " ORDER BY employees.id ASC";

      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  function handleDept(dept) {
    switch (dept) {
      case "Engineering":
        return 1;
      case "Finance":
        return 2;
      case "Sales":
        return 3;
      case "Legal":
        return 4;
    }
  }

  async function addEmployee(cntn) {
    console.log("Adding another employee... \n");

    const newEmployee = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
        ],
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the employee's manager?",
      },
    ]);
    console.log(newEmployee);

    const { first_name, last_name, role_id, manager_id } = newEmployee;
    cntn.query(
      "INSERT INTO employees SET ?",
      {
        first_name: first_name,
        last_name: last_name,
        role_id: this.handleRole(role_id),
        manager_id: manager_id,
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " employees inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

  function handleRole(answer) {
    switch (answer) {
      case "Sales Lead":
        return 1;
        case "Salesperson":
        return 2;
      case "Lead Engineer":
        return 3;
      case "Software Engineer":
        return 4;
      case "Account Manager":
        return 5;
      case "Accountant":
        return 6;
      case "Legal Team Lead":
        return 7;
      case "Lawyer":
        return 8;
        case "New Role":
        return 9;
    }
  }

  async function addRole(cntn) {
    console.log("Adding another role... \n");

    const newRole = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's name?",
      },
       {
        type: "list",
        name: "department_id",
        message: "What is the role's department?",
        choices: [
            "Engineering",
            "Finance",
            "Sales",
            "Legal",
        ],
      },  
      ]);
      console.log(newRole);
      const { title, department_id } = newRole;
      cntn.query(
      "INSERT INTO roles SET ?",
      {
        title: title,
        department_id: this.handleDept(department_id),
        
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

  async function addDept(cntn) {
    console.log("Adding another department... \n");
    const newDept = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the department's name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's department role?",
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
        ],
      },
      ]);
      console.log(newDept);
      const { title, role_id } = newDept;
      cntn.query(
      "INSERT INTO departments SET ?",
      {
        title: title,
        role_id: this.handleRole(role_id),
        
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " department inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

start();
 

