const requireOption = require('../requireOption');

 // Visszaadja az adott id-hez tartozo termeket
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({_id: req.query.id }).exec((err, prod) => {
            if(err){
                return next();
            }
            res.locals.product = prod;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};