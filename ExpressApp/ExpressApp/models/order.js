const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Order = db.model('Orders', {
    nev: String,
    cim: String,
    tel: String
});

module.exports = Order;