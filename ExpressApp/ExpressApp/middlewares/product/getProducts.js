const requireOption = require('../requireOption');

// Visszaadja az ossszes termeket
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({}).exec((err, prods) => {
            if(err){
                return next();
            }
            res.locals.products = prods;        
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};