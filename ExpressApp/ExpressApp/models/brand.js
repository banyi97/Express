const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Brand = db.model('Brand', {
    name: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = Address;