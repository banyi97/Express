const renderMw = require('../middlewares/generic/render');
const authMw = require('../middlewares/generic/auth');
const logoutMw = require('../middlewares/generic/logout');

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

   
};