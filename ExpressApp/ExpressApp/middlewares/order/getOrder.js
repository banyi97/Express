const requireOption = require('../requireOption');

// Visszadja az adott rendeles adatait
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');
    const AddressModel = requireOption(obj, 'Address');
    const ProductModel = requireOption(obj, 'Product');
    const ProductOrderModel = requireOption(obj, 'ProductOrder');
    return function (req, res, next) {    
        if (  
            typeof req.query.id === 'undefined'
            ){
                return res.render('400', {error: ""})
        }   
        var ret = {};
        OrderModel.findOne({_id: req.query.id}).exec((err, order) => {
            if(err){
            }
            ret.order = order;
            AddressModel.findOne({_id: order._addressId}).exec((err, address) => {
                if(err){
                }
                ret.address = address;
                ProductOrderModel.find({_orderId: order._id}).exec((err, prodOrders) => {
                    if(err){
                    }
                    ProductModel.find({}).exec((err, prods) => {
                        if(err){
                        }
                        ret.products = [];
                        prodOrders.forEach(element => {
                            prods.forEach(prod => {
                                if(prod._id.equals(element._productId)){
                                    ret.products.push({
                                        id: prod._id,
                                        name: element.name,
                                        price: element.price,
                                        quant: element.quantity,
                                        image: prod.image
                                    });
                                }
                            });
                        });
                        res.locals.order = ret;
                        return next();
                    })
                })
            })
        });
    };
};