const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Address = db.model('ProductOrder', {
    name: String,
    price: Number,
    quantity: Number,
    createDate: Date,
    updated: { type: Date, default: Date.now },

    _orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    _productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
});

module.exports = Address;