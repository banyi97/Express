const requireOption = require('../requireOption');

// Letrehozza a product-ot a kapott adatokbol - duplikacio engedett
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {       
        console.log(req.body.product)
        if (  
            typeof req.body.product === 'undefined' ||
            typeof req.body.product.name === 'undefined' ||
            typeof req.body.product.price === 'undefined' ||
            typeof req.body.product.quantity === 'undefined' 
        //    typeof req.body.product.brand === 'undefined' ||
        //    typeof req.body.product.name === 'undefined'
            ){
                return res.render('400', {error: ""})
        }
        ProductModel.findOne({ name: req.body.product.name }).exec((err, _prod) => {
            if(err){
                return next();
            }
            BrandModel.findOne({_id: req.body.product.brand}).exec((err, brand) => {
                var product = new ProductModel(req.body.product);
                product.createDate = new Date();
                product._brand = brand._id;
                product.save(err => {
                    if(err){
                        return next();
                    }           
                    return res.redirect('/admin/products');
                })
            })
        });
    };
};