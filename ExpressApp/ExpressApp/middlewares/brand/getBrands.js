const requireOption = require('../requireOption');

// Visszaadja az osszes brandet
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {       
        BrandModel.find({}, function(err, _brands){
            if(err){
                return next(err);
            }
            res.locals.brands = _brands;
            return next();
        })
    };
};