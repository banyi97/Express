const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        if ( typeof req.query.id === 'undefined' ){
            return next();
        }
        ProductModel.findOne({_id: req.query.id}).exec((err, product) => {
            product.remove(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/admin/products');
            })
        })
    };
};