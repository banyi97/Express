const Schema = require('mongoose').Schema;
const db = require('../database/db')

const User = db.model('User', {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    permission: String,
    token: String,
    createDate: Date,
    updated: { type: Date, default: Date.now },

});

module.exports = User;