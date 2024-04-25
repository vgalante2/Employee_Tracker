
//  COnnections & Database

const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'pass',
    port: 5432,
});

// functions for pulling database info

async function viewDepartments() {
    try {
        const res = await pool.query('SELECT * FROM departments');
        console.table(res.rows);
        mainMenu();  // Re-display the main menu after showing results
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
}

async function viewRoles() {
    try {
        const res = await pool.query('SELECT * FROM roles');
        console.table(res.rows);
        mainMenu();
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
}

async function viewAllEmployees() {
    try {
        const res = await pool.query('SELECT * FROM employee');
        console.table(res.rows);
        mainMenu();
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
}

async function addDepartment() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What department would you like to add?'
        }
       
    ])
    .then( async (answers) => {
      
      try {
        
        const sqlQuery = 'INSERT INTO departments (name) VALUES ($1)';
        const values = [answers.name];
        
        pool.query(sqlQuery, values)
        .then((res) => {
            console.log('Adding a new department...');
            console.log(res.rows)
            mainMenu();
        })
       
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
    })  
}

async function addRole() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID?'
        }
    ])
    .then( async (answers) => {
      
      try {
        
        const sqlQuery = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
        const values = [answers.title, parseFloat(answers.salary), parseInt(answers.departmentId)];
        
        pool.query(sqlQuery, values)
        .then((res) => {
            console.log('Adding a new role...');
            console.log(res.rows)
            mainMenu();
        })
       
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
    })  
}

async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role ID?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the department ID?'
        }
    ])
    .then( async (answers) => {
      
      try {
        
        const sqlQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
        const values = [answers.first_name, answers.last_name, parseFloat(answers.roleId), parseInt(answers.managerId)];
        
        pool.query(sqlQuery, values)
        .then((res) => {
            console.log('Adding a new employee...');
            console.log(res.rows)
            mainMenu();
        })
       
    } catch (err) {
        console.error('Error executing query', err.stack);
        mainMenu();
    }
    })  
}

async function updateEmployeeRole() {
    // Get employee and new role information via inquirer
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for the employee:'
        }
    ]);

    const sqlQuery = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    try {
        const res = await pool.query(sqlQuery, [answers.newRoleId, answers.employeeId]);
        if (res.rowCount > 0) {
            console.log('Employee role updated successfully!');
            mainMenu();
        } else {
            console.log('No employee found with the given ID.');
        }
    } catch (err) {
        console.error('Error executing update query', err.stack);
    }
}


// Inquirer Prompt 

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'Please select a task:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
           
        }
    ])
    .then((answers) => {
        switch (answers.task) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Exiting the application.');
                process.exit();
                break;
            default:
                console.log('Invalid option selected');
                mainMenu();
        }
    })
    .catch((err) => {
        console.error('Error encountered:', err);
        mainMenu();
    });
}

mainMenu();  // Start the application
