const requireOption = require('../requireOption');

 // Visszaadja az adott id-hez tartozo termeket
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    const BrandModel = requireOption(obj, 'Brand');
    return function (req, res, next) {  
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
        }      
        ProductModel.find({_id: req.query.id}).exec((err, prod) => {
            if(err){
                return res.render('404', {error: "Id not found"})
            }
            BrandModel.find({}).exec((err, brands) => {
                if(err){
                    return next();
                }
                var ret = new Array();        
                brands.forEach(brand => {
                    if(brand._id.equals(prod[0]._brandId)){ 
                        ret.push({
                            id: prod[0]._id,
                            name: prod[0].name,
                            price: prod[0].price,
                            brand: {
                                id: brand._id,
                                name: brand.name
                            },
                            quantity: prod[0].quantity,
                            type: prod[0].type
                        })     
                    }
                });         
                res.locals.product = ret;
                res.locals.brands = brands;
                return next();
            });
        });     
    };
};