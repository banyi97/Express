const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Address = db.model('Address', {
    nev: String,
    cim: String,
    tel: String
});

module.exports = Address;