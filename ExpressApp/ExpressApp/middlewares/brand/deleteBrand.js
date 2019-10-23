const requireOption = require('../requireOption');

// Torli az adott id-ju brand-et
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
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