const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Address = db.model('Address', {
    firstName: String,
    lastName: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    createDate: Date,
    updated: { type: Date, default: Date.now },
    
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Address;