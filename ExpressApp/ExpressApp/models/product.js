const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Product = db.model('Products', {
    name: String,
    price: String,
    quantity: String,
    type: String,
    image: String,  
    createDate: Date,
    updated: { type: Date, default: Date.now },

    _brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
});

module.exports = Product;