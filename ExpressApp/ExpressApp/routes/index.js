const fs=require('fs');
const multer = require('multer');

const renderMw = require('../middlewares/generic/render');
const errorHandlerMw = require('../middlewares/generic/errorHandler');

const authMw = require('../middlewares/generic/auth');
const noAuthMw = require('../middlewares/generic/noAuth');
const adminAuthMw = require('../middlewares/generic/adminAuth');

const loginMw = require('../middlewares/auth/login');
const registerMw = require('../middlewares/auth/register');
const logoutMw = require('../middlewares/generic/logout');
const changePasswordMw = require('../middlewares/user/changePassword');
const changeEmailMw = require('../middlewares/user/changeEmail');
const removeUserMw = require('../middlewares/user/removeUser');
const forgotPasswordMw = require('../middlewares/user/forgot/forgotpass');
const forgotPasswordPOSTMw = require('../middlewares/user/forgot/forgotpassPost');
const passwordResetMw = require('../middlewares/user/forgot/passwordreset');
const passwordResetPostMw = require('../middlewares/user/forgot/passwordresetPost');

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
const productModifyPicMw = require('../middlewares/product/modifyProdImg');
const productRemoveMw = require('../middlewares/product/removeProduct');
const productGetsMw = require('../middlewares/product/getProducts');
const productGetMw = require('../middlewares/product/getProduct');

const addressCreateMw = require('../middlewares/address/createAddress');
const addressModifyMw = require('../middlewares/address/modifyAddress');
const addressRemoveMw = require('../middlewares/address/removeAddress');
const addressGetsMw = require('../middlewares/address/getAllAddress');
const addressGetMw = require('../middlewares/address/getAddress');

const addToCardMw = require('../middlewares/cart/addcart');
const getCartMw = require('../middlewares/cart/getcart');
const removeFromCartMw = require('../middlewares/cart/removecart');
const removeAllCartMw = require('../middlewares/cart/removeAllCart');
const modifyCartElementMw = require('../middlewares/cart/modifyCart');

const ordersMw = require('../middlewares/order/getOrders');
const order1Mw = require('../middlewares/order/order1');
const createOrderMw = require('../middlewares/order/createOrder');
const modifyOrderMw = require('../middlewares/order/modifyOrderState');
const removeOrderMw = require('../middlewares/order/removeOrder');
const getOrderMw = require('../middlewares/order/getOrder');

const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const Address = require('../models/address');
const Brand = require('../models/brand');
const ProductOrder = require('../models/productOrder');

module.exports = function(app) {
    const obj = {
        User: User,
        Order: Order,
        Product: Product,
        Address: Address,
        Brand: Brand,
        ProductOrder: ProductOrder
    };

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/img')
        },
        filename: function (req, file, cb) {
          cb(null, "image_"+Date.now()+".jpg")
        }
    });
       
    const upload = multer({ storage: storage });

    app.get('/', 
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

    app.get('/order?:id', 
        authMw(obj),
        getOrderMw(obj),
        renderMw(obj, 'order'));

    app.get('/cart', 
        noAuthMw(obj),
        getCartMw(obj),
        renderMw(obj, 'cart'));

    app.post('/addtocard',
        noAuthMw(obj),
        addToCardMw(obj));

    app.put('/cart/modify',
        noAuthMw(obj),
        modifyCartElementMw(obj));

    app.delete('/cart/remove?:id',
        noAuthMw(obj),
        removeFromCartMw(obj));

    app.get('/newOrder',
        authMw(obj),
        order1Mw(obj),
        renderMw(obj, 'newOrder'));

    app.post('/newOrder',
        authMw(obj),
        createOrderMw(obj));

    app.get('/user/setting/account', 
        authMw(obj),
        renderMw(obj, 'setting_account'));

    app.get('/user/setting/address', 
        authMw(obj),
        addressGetsMw(obj),
        renderMw(obj, 'setting_address'));

    app.get('/user/setting/chancepassword', 
        authMw(obj),
        renderMw(obj, 'setting_changePass'));

    app.get('/user/setting/edit', 
        authMw(obj),
        renderMw(obj, 'setting_edit'));

    app.get('/user/setting/remove', 
        authMw(obj),
        renderMw(obj, 'setting_remove'));

    app.post('/user/setting/address/modify', 
        authMw(obj),
        renderMw(obj, 'setting'));

    app.get('/user/setting/address/delete?:id', 
        authMw(obj),
        addressRemoveMw(obj));
    
    app.get('/admin/products', 
        authMw(obj),
        adminAuthMw(obj),
        productGetsMw(obj),
        renderMw(obj, 'adminProducts'));

    app.post('/admin/products', 
        authMw(obj),
        adminAuthMw(obj),
        upload.single('image'), 
        productCreateMw(obj));

    app.get('/admin/products/modify?:id',
        authMw(obj),
        adminAuthMw(obj),
        productGetMw(obj),
        renderMw(obj, 'adminProduct_modify'));

    app.post('/admin/products/update',
        authMw(obj),
        adminAuthMw(obj),
        productModifyMw(obj));

    app.post('/admin/products/updateIMG',
        authMw(obj),
        adminAuthMw(obj),
        upload.single('image'), 
        productModifyPicMw(obj));

    app.get('/admin/products/delete?:id', 
        authMw(obj),
        adminAuthMw(obj),
        productRemoveMw(obj));
    
    app.get('/admin/orders', 
        authMw(obj),
        adminAuthMw(obj),
        adminOrdersMw(obj),
        renderMw(obj, 'adminOrders'));

    app.put('/admin/orders/modify', 
        authMw(obj),
        adminAuthMw(obj),
        modifyOrderMw(obj));

    app.delete('/admin/orders/remove?:id', 
        authMw(obj),
        adminAuthMw(obj),
        removeOrderMw(obj));

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
        brandGetsMw(obj),
        renderMw(obj, 'adminBrands'));

    app.get('/admin/brandsREST', 
        authMw(obj),
        adminAuthMw(obj),
        brandGetsMw(obj));

    app.post('/admin/brands',
        authMw(obj),
        adminAuthMw(obj),
        brandCreateMw(obj));

    app.put('/admin/brand',
        authMw(obj),
        adminAuthMw(obj),
        brandModifyMw(obj));

    app.get('/admin/brand/delete?:id',
        authMw(obj),
        adminAuthMw(obj),
        brandRemoveMw(obj));

    app.get('/products', 
        noAuthMw(obj),
        productGetsMw(obj),
        renderMw(obj, 'products'));

    app.get('/product?:id', 
        noAuthMw(obj),
        productGetMw(obj),
        renderMw(obj, 'prodPage'));

    app.post('/changePassword',
        authMw(obj),
        changePasswordMw(obj));

    app.get('/addressAll', 
        authMw(obj),
        addressGetsMw(obj));

    app.get('/address?:id', 
        authMw(obj),
        addressGetMw(obj),
        renderMw(obj, 'setting_addr_modify'));

    app.post('/address/modify', 
        authMw(obj),
        addressModifyMw(obj));

    app.post('/address',
        authMw(obj),
        addressCreateMw(obj));

    app.post('/changeEmail',
        authMw(obj),
        changeEmailMw(obj));

    app.post('/user/setting/removeUser',
        authMw(obj),
        removeUserMw(obj));
};