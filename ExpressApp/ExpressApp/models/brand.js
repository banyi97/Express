const Schema = require('mongoose').Schema;
const db = require('../database/db')

const Brand = db.model('Brand', {
    name: String,
    createDate: Date,
    updated: { type: Date, default: Date.now },
});

module.exports = Brand;