const Employee = require("./employee")

class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email)
        this.officeNumber = officeNum;
    }
    getRole() {
        return "Manager"
    }
    getOfficeNumber() {
        return this.officeNum
    }
}

module.exports = Manager