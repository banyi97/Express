const requireOption = require('../requireOption');

// Visszaadja a kosar tartalmat
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    return function (req, res, next) {    
        if (typeof req.session.cart === 'undefined') {     
            res.locals.cart = null;
            return next();
        }
        else{
            var cart = req.session.cart;
            ProductModel.find({}).exec((err, prods) => {
                if(err){
                    res.locals.cart = null;
                    return next();
                }
                var selectedProd = [];
                cart.forEach(cart_element => {
                    prods.forEach(prod => {
                        if(prod._id.equals(cart_element.id)){
                            var copy_prod = prod;
                            copy_prod.quant = cart_element.quant;
                            selectedProd.push(copy_prod);
                        }
                    });
                    res.locals.cart = selectedProd;    
                });
                return next();
            });
        }
    };
};