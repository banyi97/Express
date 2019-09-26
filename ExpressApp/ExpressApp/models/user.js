const Schema = require('mongoose').Schema;
const db = require('../database/db')

const User = db.model('Users', {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    permission: String,
    _orders: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = User;