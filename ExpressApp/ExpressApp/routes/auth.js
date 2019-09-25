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

    app.get('/login', 
        renderMw(obj, 'login'));

    app.use('/login',
                                            authMw(obj),
        renderMw(obj, 'adminOrders'));

    app.get('/register', 
        renderMw(obj, 'register'));

     //   app.use('/register')

    app.use('/logout', 
        logoutMw(obj));
};