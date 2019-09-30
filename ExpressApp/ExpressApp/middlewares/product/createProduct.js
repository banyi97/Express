const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({name: req.body.product.name}).exec((err, prod) => {
            if(err){
                return next();
            }
            
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};