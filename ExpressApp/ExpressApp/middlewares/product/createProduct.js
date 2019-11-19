const requireOption = require('../requireOption');

const fs=require('fs');
const multer = require('multer');

// Letrehozza a product-ot a kapott adatokbol - duplikacio engedett
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {  
        console.log("Call")     
        console.log(req.body)
        if (  
            typeof req.body === 'undefined' ||
            typeof req.body.name === 'undefined' ||
            typeof req.body.price === 'undefined' ||
            typeof req.body.quantity === 'undefined' ||
            typeof req.body.brandId === 'undefined' ||
            typeof req.body.type === 'undefined'
            ){
                return res.render('400', {error: ""})
        }
        BrandModel.findOne({_id: req.body.brandId}).exec((err, brand) => {
            if(brand){
                var product = new ProductModel(req.body);
                product.createDate = new Date();
                product._brandId = req.body.brandId;
                product.pic=req.file.path.split("\\")[2];
                product.save(err => {
                    if(err){
                        return next();
                    }           
                    return res.redirect('/admin/products');
                })
            }
            else
                return res.render('400', {error: ""})
        });
    };
};