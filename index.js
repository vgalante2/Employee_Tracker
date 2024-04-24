const inquirer = require('inquirer')







inquirer.prompt([
    {
    type: 'list',
    message: 'Please select a task: ',
    name: 'task',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add a employee', 'update an employee role']
    }
])
.then((answers) => {
    console.log(answers)
})
.catch((err) => {
    console.log(err)
})