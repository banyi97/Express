const renderMw = require('../middlewares/generic/render');
const errorHandlerMw = require('../middlewares/generic/errorHandler');
const getHTMLmw = require('../middlewares/generic/getHTMLfiles');

const authMw = require('../middlewares/generic/auth');
const noAuthMw = require('../middlewares/generic/noAuth');
const adminAuthMw = require('../middlewares/generic/adminAuth');

const loginMw = require('../middlewares/auth/login');
const registerMw = require('../middlewares/auth/register');
const logoutMw = require('../middlewares/generic/logout');
const changePasswordMw = require('../middlewares/user/changePassword');
const forgotPasswordMw = require('../middlewares/user/forgot/forgotpass');
const forgotPasswordPOSTMw = require('../middlewares/user/forgot/forgotpassPost');
const passwordResetMw = require('../middlewares/user/forgot/passwordreset');
const passwordResetPostMw = require('../middlewares/user/forgot/passwordresetPost');
const addressMw = require('../middlewares/user/address');

const adminCustomersMw = require('../middlewares/user/adminCustomers');
const adminCustomersPutMw = require('../middlewares/user/adminCustomerPut');
const adminCustomersRemoveMw = require('../middlewares/user/adminCustomersRemove');
const adminOrdersMw = require('../middlewares/order/adminOrder');

const brandCreateMw = require('../middlewares/brand/createBrand');
const brandModifyMw = require('../middlewares/brand/modifyBrand');
const brandRemoveMw = require('../middlewares/brand/deleteBrand');
const brandGetsMw = require('../middlewares/brand/getBrands');

const productCreateMw = require('../middlewares/product/createProduct');
const productModifyMw = require('../middlewares/product/modifyProduct');
const productRemoveMw = require('../middlewares/product/removeProduct');
const productGetsMw = require('../middlewares/product/getProducts');
const productGetMw = require('../middlewares/product/getProduct');

const addressCreateMw = require('../middlewares/address/createAddress');
const addressModifyMw = require('../middlewares/address/modifyAddress');
const addressRemoveMw = require('../middlewares/address/removeAddress');
const addressGetsMw = require('../middlewares/address/getAllAddress');
const addressGetMw = require('../middlewares/address/getAddress');

const ordersMw = require('../middlewares/order/getOrders');

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
    //    getHTMLmw(__dirname ,'index.html'),
        noAuthMw(obj),
        renderMw(obj, 'index'));

    app.get('/login',
        errorHandlerMw(obj),
        renderMw(obj, 'login'));

    app.post('/login',
        loginMw(obj),
        errorHandlerMw(obj),
        renderMw(obj, 'login'));

    app.get('/register', 
        errorHandlerMw(obj),
        renderMw(obj, 'register'));

    app.post('/register',
        registerMw(obj),
        errorHandlerMw(obj),
        renderMw(obj, 'register'));

    app.get('/logout', 
        authMw(obj),
        logoutMw(obj));
        
    app.get('/forgot', 
        noAuthMw(obj),
        forgotPasswordMw(obj),
        renderMw(obj,'forgotPass'));   

    app.post('/forgot',
        noAuthMw(obj),
        forgotPasswordPOSTMw(obj));

    app.get('/password-reset?:token', 
        noAuthMw(obj),
        passwordResetMw(obj),
        renderMw(obj,'forgotPass'));   

    app.post('/password-reset', 
        noAuthMw(obj),
        passwordResetPostMw(obj)); 

    app.get('/orders', 
        authMw(obj),
        ordersMw(obj),
        renderMw(obj, 'orders'));

    app.get('/user/setting', 
        authMw(obj),
        renderMw(obj, 'setting'));

    app.post('/user/setting/address/modify', 
        authMw(obj),
        addressMw(obj),
        renderMw(obj, 'setting'));
    
    app.get('/admin/products', 
        authMw(obj),
        adminAuthMw(obj),
        renderMw(obj, 'adminProducts'));
    
    app.get('/admin/orders', 
        authMw(obj),
        adminAuthMw(obj),
        adminOrdersMw(obj),
        renderMw(obj, 'adminOrders'));
       
    app.get('/admin/customers', 
        authMw(obj),
        adminAuthMw(obj),
        adminCustomersMw(obj),
        renderMw(obj, 'adminCustomers'));

    app.put('/admin/customers', 
        authMw(obj),
        adminAuthMw(obj),
        adminCustomersPutMw(obj));

    app.get('/admin/customers/delete?:id', 
        authMw(obj),
        adminAuthMw(obj),
        adminCustomersRemoveMw(obj));

    app.get('/admin/brands', 
        authMw(obj),
        adminAuthMw(obj),
        renderMw(obj, 'adminBrands'));

    app.get('/admin/brandsREST', 
        authMw(obj),
        adminAuthMw(obj),
        brandGetsMw(obj));

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

    app.get('/addressAll', 
        authMw(obj),
        addressGetsMw(obj));

    app.get('/address/:id', 
        authMw(obj),
        addressGetMw(obj));

    app.post('/address',
        authMw(obj),
        addressMw(obj),
        addressCreateMw(obj));

    app.put('/address/:id',
        authMw(obj),
        addressModifyMw(obj));

    app.delete('/address/:id',
        authMw(obj),
        addressRemoveMw(obj));
};