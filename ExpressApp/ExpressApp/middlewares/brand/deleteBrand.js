const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        if ( typeof req.query.id === 'undefined' ){
            return next();
        }
        BrandModel.findOne({_id: req.query.id}).exec((err, brand) => {
            brand.remove(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/admin/brands');
            })
        })
    };
};