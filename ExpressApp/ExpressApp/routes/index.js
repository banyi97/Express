const renderMw = require('../middlewares/generic/render');

const authMw = require('../middlewares/generic/auth');
const noAuthMw = require('../middlewares/generic/noAuth');
const adminAuthMw = require('../middlewares/generic/adminAuth');

const loginMw = require('../middlewares/auth/login');
const registerMw = require('../middlewares/auth/register');
const logoutMw = require('../middlewares/generic/logout');
const changePasswordMw = require('../middlewares/user/changePassword');

const brandCreateMw = require('../middlewares/brand/createBrand');
const brandModifyMw = require('../middlewares/brand/modifyBrand');
const brandRemoveMw = require('../middlewares/brand/deleteBrand');
const brandGetsMw = require('../middlewares/brand/getBrands');

const productCreateMw = require('../middlewares/product/createProduct');
const productModifyMw = require('../middlewares/product/modifyProduct');
const productRemoveMw = require('../middlewares/product/removeProduct');
const productGetsMw = require('../middlewares/product/getProducts');
const productGetMw = require('../middlewares/product/getProduct');

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
        noAuthMw(obj),
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
        authMw(obj),
        logoutMw(obj));

    app.get('/orders', 
        authMw(obj),
        renderMw(obj, 'orders'));

    app.get('/user/setting', 
        authMw(obj),
        renderMw(obj, 'setting'));
    
    app.get('/admin/products', 
        authMw(obj),
        adminAuthMw(obj),
        renderMw(obj, 'adminCustomers'));
    
    app.get('/admin/orders', 
        authMw(obj),
        adminAuthMw(obj),
        renderMw(obj, 'adminOrders'));

    app.get('/admin/customers', 
        authMw(obj),
        adminAuthMw(obj),
        renderMw(obj, 'adminProducts'));

    app.get('/admin/brands', 
        authMw(obj),
        adminAuthMw(obj),
        brandGetsMw(obj),
        renderMw(obj, 'adminBrands'));

    app.post('/admin/brands',
        authMw(obj),
        adminAuthMw(obj),
        brandCreateMw(obj));

    app.put('/admin/brand/:id',
        authMw(obj),
        adminAuthMw(obj),
        brandModifyMw(obj));

    app.delete('/admin/brand/:id',
        authMw(obj),
        adminAuthMw(obj),
        brandRemoveMw(obj));

    app.get('/products', 
        noAuthMw(obj),
        brandGetsMw(obj),
        renderMw(obj, 'products'));

    app.get('/product/:id', 
        noAuthMw(obj),
        productGetMw(obj),
        renderMw(obj, 'prodPage'));

    app.post('/admin/products',
        authMw(obj),
        adminAuthMw(obj),
        productCreateMw(obj));

    app.put('/admin/products/:id',
        authMw(obj),
        adminAuthMw(obj),
        productModifyMw(obj));

    app.delete('/admin/products/:id',
        authMw(obj),
        adminAuthMw(obj),
        productRemoveMw(obj));

    app.post('/changePassword',
        authMw(obj),
        changePasswordMw(obj));
};