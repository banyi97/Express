const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Order = db.model('Order', {
    createDate: Date,
    updated: { type: Date, default: Date.now },
    state: String,
    payment: String,
    shippingType: String,
    addressType: Number,
    _addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Order;