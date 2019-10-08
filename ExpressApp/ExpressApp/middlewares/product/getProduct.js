const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({_id: req}).exec((err, prod) => {
            if(err){
                return next();
            }
            res.locals.product = prod;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};