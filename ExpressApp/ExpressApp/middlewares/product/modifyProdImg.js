const requireOption = require('../requireOption');

const fs=require('fs');
const multer = require('multer');

// Modositja a product uj kepehez tartozo cimet
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    return function (req, res, next) {    
        console.log("call")
        if (  
            typeof req.body === 'undefined' ||
            typeof req.body.id === 'undefined' 
            ){
                return res.render('400', {error: ""})
        }
        ProductModel.findOne({_id: req.body.id}).exec((err, prod) => {
            if(prod){       
                prod.image = req.file.path.split("\\")[2];
                prod.save(err => {
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