var fs = require("fs");
var path = require("path");

var htmlTemp = "./templates/"

const employeeGen = require("./lib/employee");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const manager = require("./lib/manager");
let teamMembers = ""

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(htmlTemp, "manager.html"), "utf8");
    let managerHTML = ""

    managerHTML = managerHTML + template.replace(/{{ name }}/g, manager.getName())
        .replace(/{{ role }}/g, manager.getRole())
        .replace(/{{ email }}/g, manager.getEmail())
        .replace(/{{ id }}/g, manager.getID())
        .replace(/{{ officeNumber }}/g, manager.getOfficeNumber())
    teamMembers = teamMembers + managerHTML;
    console.log(managerHTML)
};
const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(htmlTemp, "engineer.html"), "utf8");
    let engineerHTML = ""

    engineerHTML = engineerHTML + template.replace(/{{ name }}/g, engineer.getName())
        .replace(/{{ role }}/g, engineer.getRole())
        .replace(/{{ email }}/g, engineer.getEmail())
        .replace(/{{ id }}/g, engineer.getID())
        .replace(/{{ github }}/g, engineer.getGithub())
    teamMembers = teamMembers + engineerHTML;
    console.log(engineerHTML)
};
const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(htmlTemp, "intern.html"), "utf8");
    let internHTML = ""

    internHTML = internHTML + template.replace(/{{ name }}/g, intern.getName())
        .replace(/{{ role }}/g, intern.getRole())
        .replace(/{{ email }}/g, intern.getEmail())
        .replace(/{{ id }}/g, intern.getID())
        .replace(/{{ school }}/g, intern.getSchool())
    teamMembers = teamMembers + internHTML;
    console.log(internHTML)
};

function createManager(name, id, email, officeNumber) {
    const manager = new Manager(name, id, email, officeNumber)
    renderManager(manager)
}

function createEngineer(name, id, email, github) {
    const engineer = new Engineer(name, id, email, github)
    renderEngineer(engineer)
}

function createIntern(name, id, email, school) {
    const intern = new Intern(name, id, email, school)
    renderIntern(intern)
}

function renderMain() {
    let mainTemp = fs.readFileSync(path.resolve(htmlTemp, "main.html"), "utf8");
    var mainHTML = ""
    mainHTML = mainHTML + mainTemp.replace(/{{ team }}/g, teamMembers)
    let file = path.join(__dirname, 'output', "/index.html");
    console.log(file);

    fs.writeFile(file, mainHTML, function (err) {
        if (err) {
            throw new Error(err)
        }
        console.log("Writing file complete")
    })
}

module.exports = {
    createManager: createManager,
    createEngineer: createEngineer,
    createIntern: createIntern,
    renderMain: renderMain
}

