const requireOption = require('../requireOption');

// Modositja a kapott id-ju termeket a kapott adatokkal
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');

    return function (req, res, next) {     
        console.log("Call")
        if (  
            typeof req.body.product === 'undefined' ||
            typeof req.body.product.id === 'undefined' ||
            typeof req.body.product.name === 'undefined' ||
            typeof req.body.product.price === 'undefined' ||
            typeof req.body.product.quantity === 'undefined' ||
            typeof req.body.product.brandId === 'undefined' ||
            typeof req.body.product.type === 'undefined'
            ){
                return res.render('400', {error: ""})
        }  
        ProductModel.findOne({_id: req.body.product.id}).exec((err, prod) => {
            if(err){
                return next();
            }
            if(prod){
                prod.name = req.body.product.name;
                prod.price = req.body.product.price;
                prod.quantity = req.body.product.quantity;
                prod.type = req.body.product.type;
                prod._brandId = req.body.product.brandId;
                prod.save(err => {
                    if(err){
                        return next();
                    }
                    return res.redirect('/admin/products')
                })
            }
            else{
                return res.render('404', {error: ""})
            }
        });
    };
};