const Schema = require('mongoose').Schema;
const db = require('../database/db')

const User = db.model('Users', {
    firstName: String,
    lastName: String,
    phoneNumber: String
});

module.exports = User;