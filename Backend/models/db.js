const mongoose = require('mongoose');

async function connectMongoose(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongoose,
    Employee: require('../models/employee').employee,
    User :require('../models/user').User,
    Token :require('../models/token').Token
}