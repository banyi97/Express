const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Product = db.model('Products', {
    name: String,
    price: String,
    quantity: String,
    type: String,
    image: String,  
    createDate: Date,
});

module.exports = Product;