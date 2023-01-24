INSERT INTO department (name)
VALUES  ('Accounting'), 
        ('Administration'), 
        ('Engineering'), 
        ('Human Resources'), 
        ('Maintenance');

INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', 150000, 1), 
        ('Vice President', 250000, 2), 
        ('Senior Developer', 100000, 3), 
        ('Benefits Specialist', 65000, 4), 
        ('Electrician', 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Williams', 1, 1), 
        ('Tim', 'Burton', 2, 2), 
        ('Steven', 'Spielberg', 3, 3), 
        ('Hans', 'Zimmer', 4, null), 
        ('John', 'Hughes', 5, 5);


