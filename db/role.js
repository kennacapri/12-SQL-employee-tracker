const Department = require("./Department");

class Role {
    constructor(title, salary) {
        this.title = title;
        this.salary = salary;
        this.department = new Department();
    }
}

module.exports = Role;