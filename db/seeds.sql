INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 100000.00, 1),
("Salesperson", 80000.00, 3),
("Lead Engineer", 150000.00, 1),
("Software Engineer", 120000.00, 1),
("Account Manager", 160000.00, 1),
("Accountant", 125000.00, 2),
("Legal Team Lead", 250000.0, 4),
("Lawyer", 190000.00, 4);

-- select * from employees, 
-- select roles.title, roles.salary, departments.name
INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES
("John", "Doe", 1, null),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, null),
("Malia", "Brown", 6, 5),
("Sarah", "Lloyd", 7, null),
("Tom", "Allen", 8, 7),



