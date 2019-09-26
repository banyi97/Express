const renderMw = require('../middlewares/generic/render');
const authMw = require('../middlewares/generic/auth');
const logoutMw = require('../middlewares/generic/logout');
const loginMw = require('../middlewares/auth/login');
const registerMw = require('../middlewares/auth/register');
const changePasswordMw = require('../middlewares/user/changePassword');

const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const Address = require('../models/address');
const Brand = require('../models/brand');

module.exports = function(app) {
    const obj = {
        User: User,
        Order: Order,
        Product: Product,
        Address: Address,
        Brand: Brand
    };

   app.get('/', 
        authMw(obj),
        renderMw(obj, 'index'));

    app.get('/login', 
        renderMw(obj, 'login'));

    app.post('/login',
        loginMw(obj));

    app.post('/register',
        registerMw(obj));

    app.get('/register', 
        renderMw(obj, 'register'));

    app.get('/logout', 
        logoutMw(obj));

    app.get('/orders', 
        authMw(obj),
        renderMw(obj, 'adminOrders'));

    app.get('/user/setting', 
        authMw(obj),
        renderMw(obj, 'setting'));
    
    app.get('/admin/products', 
        authMw(obj),
        renderMw(obj, 'adminCustomers'));
    
    app.get('/admin/orders', 
        authMw(obj),
        renderMw(obj, 'adminOrders'));

    app.get('/admin/customers', 
        authMw(obj),
        renderMw(obj, 'adminProducts'));

    app.post('/changePassword',
        authMw(obj),
        changePasswordMw(obj));
};