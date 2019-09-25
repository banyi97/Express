const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Product = db.model('Products', {
    nev: String,
    cim: String,
    tel: String
});

module.exports = Product;