
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

function addDepartment() {
    console.log('Adding a new department...');
    // Implement prompt and insertion logic here
    mainMenu();
}

function addRole() {
    console.log('Adding a new role...');
    // Implement prompt and insertion logic here
    mainMenu();
}

function addEmployee() {
    console.log('Adding a new employee...');
    // Implement prompt and insertion logic here
    mainMenu();
}

function updateEmployeeRole() {
    console.log('Updating employee role...');
    // Implement prompt and update logic here
    mainMenu();
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
