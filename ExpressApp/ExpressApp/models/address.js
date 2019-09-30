const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Address = db.model('Address', {
    address: String,
    city: String,
    state: String,
    zip: String,
    createDate: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Address;