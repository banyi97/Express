const Schema = require('mongoose').Schema;
const db = require('../database/db')

const User = db.model('Users', {
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

module.exports = User;