const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        if (  
            typeof req.body.brand === 'undefined' ||
            typeof req.body.brand.name === 'undefined'
            ){
            return next();
        }
        BrandModel.findOne({ name: req.body.brand.name }).exec((err, _brand) => {
            if(_brand){
                return next();
            }
            var brand = new BrandModel(req.body.brand);
            brand.save(err => {
                if(err){
                    return next();
                }
                BrandModel.find({}, (err, brands) => {
                    if(err){
                        return next();
                    }
                    return res.status(200).send({ brands: brands });
                })
            })
        });
    };
};