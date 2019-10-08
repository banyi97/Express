const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {       
        BrandModel.find({}).exec((err, _brands) => {
            if(err){
                return next();
            }
            res.locals.brands = _brands;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};