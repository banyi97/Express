const requireOption = require('../requireOption');

 // Letrehozza a rendelest
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');
    const ProductModel = requireOption(obj, 'Product');
    const ProductOrderModel = requireOption(obj, 'ProductOrder');

    return function (req, res, next) {       
        if (  
            typeof req.body.order === 'undefined' ||
            typeof req.body.order.addressId === 'undefined' ||
            typeof req.body.order.shipping === 'undefined' ||
            typeof req.body.order.paymant === 'undefined'
            ){
                return res.render('400', {error: ""})
        }
        var order = new OrderModel();
        order.state = "Step 1."
        order.paymant = req.body.order.paymant;
        order.shippingType = req.body.order.shipping;
        order._addressId = req.body.order.addressId;
        order._userId = req.session.userid;
        order.createDate = new Date();
        order.save(err => {
            if(err){
                return next();
            }    
            ProductModel.find({}).exec((err, prods) => {
                if(err){
                    return next();
                }
                var cart = req.session.cart;       
                cart.forEach(cartElement => {
                    prods.forEach(prod => {
                        if(prod._id.equals(cartElement.id)){
                            var prodOrder = new ProductOrderModel();
                            prodOrder.name = prod.name;
                            prodOrder.price = prod.price;
                            prodOrder.quantity = prod.quantity;
                            prodOrder.createDate = new Date();
                            prodOrder._orderId = order._id;
                            prodOrder._productId = prod._id;
                            prodOrder.save(err => {       
                                if(err){
                                    console.log("error")
                                }             
                            })
                        }
                    });
                });
                req.session.cart = undefined;
                return res.redirect('/');
            })
        })
    };
};