const renderMw = require('../middlewares/generic/render');
const logoutMw = require('../middlewares/generic/logout');
const authMw = require('../middlewares/generic/auth');

const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const Address = require('../models/address');

module.exports = function(app) {
    const obj = {
        User: User,
        Order: Order,
        Product: Product,
        Address: Address
    };

   app.get('/setting', 
        authMw(obj),
        renderMw(obj, 'setting'));

};