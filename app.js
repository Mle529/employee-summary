const fs = require("fs")
const inquirer = require("inquirer")

let renderFile = require("./render")
const generateManager = renderFile.createManager
const generateEngineer = renderFile.createEngineer
const generateIntern = renderFile.createIntern
const renderHTML = renderFile.renderMain

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
                        inquirer
                            .prompt({
                                type: "input",
                                message: "What is your Github username?",
                                name: "github"
                            }).then(
                                function ({ github }) {
                                    generateEngineer(name, id, email, github)
                                    addNewMembers()
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
                                    addNewMembers()
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
                                function ({ officeNumber }) {
                                    generateManager(name, id, email, officeNumber)
                                    addNewMembers()
                                }
                            )
                        break

                }
            })
}
function addNewMembers() {
    inquirer.prompt({
        type: "confirm",
        message: "Add more Team members?",
        name: "addNewMembers"
    }).then(
        function ({ addNewMembers }) {
            console.log("add members", addNewMembers)
            if (addNewMembers) {
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