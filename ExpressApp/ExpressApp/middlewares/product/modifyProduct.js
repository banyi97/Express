const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({_id: req}).exec((err, prod) => {
            if(err){
                return next();
            }
            if(prod){
                prod.name = req.body.product.name;
                prod.save(err => {
                    if(err){
                        return next();
                    }
                    return res.status(200).send(prod);
                })
            }
        });
    };
};