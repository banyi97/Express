const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Order = db.model('Orders', {
    nev: String,
    cim: String,
    tel: String,
    createDate: Date,
    updated: { type: Date, default: Date.now },

    state: String,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Order;