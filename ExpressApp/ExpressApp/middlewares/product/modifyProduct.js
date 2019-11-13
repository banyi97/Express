const requireOption = require('../requireOption');

// Modositja a kapott id-ju termeket a kapott adatokkal
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {       
        ProductModel.find({_id: req.body.product.id}).exec((err, prod) => {
            if(err){
                return next();
            }
            if(prod){
                prod.name = req.body.product.name;
                prod.price = req.body.product.price;
                prod.quantity = req.body.product.quantity;
                prod.type = req.body.product.type;
                prod.save(err => {
                    if(err){
                        return next();
                    }
                    return res.status(200).send(prod);
                })
            }
            else{
                return res.render('404', {error: ""})
            }
        });
    };
};