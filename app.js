var fs = require("fs");
var inquire = require("inquirer");

let renderFile = require("./render");

function promptUser() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "number",
            message: "What is your ID?",
            name: "id",

        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email",
        },
        {
            type: "list",
            message: "What is your role?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ]
        }

        ])

        .then(
            function ({ name, id, email, role }) {
                switch (role) {
                    case "Engineer":
                        inquire
                            .prompt({
                                type: "input",
                                message: "What is your Github username?",
                                name: "github"
                            }).then(
                                function ({ github }) {
                                    generateEngineer(name, id, email, github)
                                    addMembers()
                                }
                            )
                        break
                    case "Intern":
                        inquirer
                            .prompt({
                                type: "input",
                                message: "What school do you attend?",
                                name: "school"
                            }).then(
                                function ({ school }) {
                                    generateIntern(name, id, email, school)
                                    addMembers()
                                }
                            )
                        break
                    case "Manager":
                        inquirer
                            .prompt({
                                type: "Input",
                                message: "What is your office number?",
                                name: "office"
                            }).then(
                                function ({ officeNum }) {
                                    generateManager(name, id, email, officeNum)
                                    addMembers()
                                }
                            )
                        break

                }
            })
}
function addMembers() {
    inquirer.prompt({
        type: "confirm",
        message: "Add more Team members?",
        name: "addMembers"
    }).then(
        function ({ addMembers }) {
            console.log("add members", addMembers)
            if (addMembers) {
                promptUser()
            } else {
                renderHTML()
            }
        }
    )
        .catch(err => {
            console.log("Problem adding new members", err)
            throw err
        })
}
promptUser()