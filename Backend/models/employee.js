const { Schema, model } = require('mongoose')
const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        require: true,

    },
    LastName: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,

    },
    DateOfBirth: {
        type: String
    },
    Gender: {
        type: String
    },
    Address: {
        type: String
    },
    Country: {
        type: String
    },
    city: {
        type: String
    },
    skills: {
        type: Array
    },
    is_Active: {
        type: Boolean,
        defalut: true
    }

}, {
    timestamps: true
})
EmployeeSchema.set('toJSON', { virtuals: true })
const employee = model('employee', EmployeeSchema);
module.exports = { employee, EmployeeSchema };

