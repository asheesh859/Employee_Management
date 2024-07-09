const { Employee } = require('../models/db')

class EmployeeController {
    static addEmployee = async (req, res) => {
        try {
            const body = req.body;
            console.log(body);
            const employee = new Employee(body)
            if (!employee) {
                return res.status(404).send({Message : 'Employee Data Missing'});
            }
            const employeeSave = await employee.save();

            return res.status(201).send({ 'Message': 'employee Add successfully ', employee: employeeSave });
        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }
    }

    static getAllEmployee = async (req, res) => {
        try {
            const getAllEmployee = await Employee.find({});
            if (!getAllEmployee) {
                return res.status(404).send({ "Message": "No Employee found", })
            }
            return res.status(200).send({ Messge: "get All Employee Successfully", AllEmployee: getAllEmployee.length, employee: getAllEmployee });
        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }
    }
    static deleteEmployee = async (req, res) => {
        const id = req.params.id;
        try {
            const deletedEmployee = await Employee.findOneAndDelete({ _id: id })
            if (!deletedEmployee) {
                return res.status(404).send({ "Message": "no employee found" });
            }
            return res.status(200).send({ 'Message': 'employee delete successfully ', employee: deletedEmployee });
        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }
    }

    static updateEmployee = async (req, res) => {
        try {
            const { id } = req.params;
            const updateValues = req.body;
            const UpdateEmployee = await Employee.findByIdAndUpdate({ _id: id }, updateValues, { new: true });

            if (!UpdateEmployee) {
                return res.status(404).send({ "Message": 'employee not found to update..' });
            }
            return res.status(200).send({ "Message": 'employee updated..', employee: UpdateEmployee });

        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }
    }

    static getEmployeeById = async (req, res) => {
        try {
            const { id } = req.params;
            const employee = await Employee.findById({ _id: id });
            if (!employee) {
                return res.status(404).send({ Massege: 'Employee not found ' });
            }
            return res.status(200).send({ Message: "Employee Found Successfully ", Employee: employee });
        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }
    }

    static searchEmployee = async (req, res) => {

        try {
            const { mobile, name } = req.body;
            if (mobile && name) {
                const employeeRecord = await Employee.findOne({ mobile: mobile, firstName: name });
                if (!employeeRecord) {
                    return res.status(404).send({ Message: 'employee Not found' })
                }
                return res.status(200).send({ Message: 'employee found ', employee: employeeRecord });
            } if (mobile) {
                const employeeRecord = await Employee.findOne({ mobile: mobile });
                if (!employeeRecord) {
                    return res.status(404).send({ Message: 'employee Not found' })
                }
                return res.status(200).send({ Message: 'employee found ', employee: employeeRecord });
            } if (name) {
                const employeeRecord = await Employee.findOne({ firstName: name });
                if (!employeeRecord) {
                    return res.status(404).send({ Message: 'employee Not found' })
                }
                return res.status(200).send({ Message: 'employee found ', employee: employeeRecord });
            }
            return res.status(404).send({ Message: 'Data Missing ' });

        } catch (error) {
            return res.status(500).send({ "Message": error.message });
        }




    }
}

module.exports = { EmployeeController }