const requireOption = require('../requireOption');

 // Torli a megkapott termeket
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
        }
        ProductModel.findOne({_id: req.query.id}).exec((err, product) => {
            if(product){
                product.remove(err => {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/admin/products');
                })
            }
            else{
                return res.render('400', {error: ""})
            }
        })
    };
};