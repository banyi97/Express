const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Product = db.model('Product', {
    name: String,
    price: String,
    quantity: String,
    type: String,
    image: String,  
    createDate: Date,
    updated: { type: Date, default: Date.now },

    _brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
});

module.exports = Product;