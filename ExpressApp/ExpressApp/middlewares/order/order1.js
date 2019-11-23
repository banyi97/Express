const requireOption = require('../requireOption');

 // Visszaadja a megrendelo lapot
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    const AddressModel = requireOption(obj, 'Address');
    return function (req, res, next) {       
        var cart = req.session.cart;
        ProductModel.find({}).exec((err, prods) => {
        if(err){
            res.locals.cart = null;
            return next();
        }
        var price = 0;
        cart.forEach(cart_element => {
            prods.forEach(prod => {
                if(prod._id.equals(cart_element.id)){
                    price += prod.price * cart_element.quant;
                }
            });  
        });
        AddressModel.find({_userId: req.session.userid}).exec((err, addresses) => {
            res.locals.price = price;    
            res.locals.addresses = addresses;
            return next(); 
        });
        });
    };
};