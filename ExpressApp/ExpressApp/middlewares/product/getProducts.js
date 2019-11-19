const requireOption = require('../requireOption');

// Visszaadja az ossszes termeket
module.exports = function (obj) {
    const ProductModel = requireOption(obj, 'Product');
    const BrandModel = requireOption(obj, 'Brand');
    return function (req, res, next) {       
        ProductModel.find({}).exec((err, prods) => {
            if(err){
                return next();
            }
            BrandModel.find({}).exec((err, brands) => {
                if(err){
                    return next();
                }
                var ret = new Array();
                brands.forEach(brand => {
                    prods.forEach(prod => {                        
                        if(brand._id.equals(prod._brandId)){
                            ret.push({
                                id: prod._id,
                                name: prod.name,
                                price: prod.price,
                                brand: {
                                    id: brand._id,
                                    name: brand.name
                                },
                                quantity: prod.quantity,
                                type: prod.type,
                                createDate: prod.createDate,
                                updated: prod.updated,
                                image: prod.image
                            });
                        }
                    });
                });
                console.log(ret)
                res.locals.brands = brands;
                res.locals.products = ret;        
                return next();
            }); 
        });
    };
};