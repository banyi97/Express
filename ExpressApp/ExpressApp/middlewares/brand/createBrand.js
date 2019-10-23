const requireOption = require('../requireOption');

 // A megkapott adatokbol letrehoz egy uj brand-et... duplikacio megengedett
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        
        if (  
            typeof req.body.brand === 'undefined' ||
            typeof req.body.brand.name === 'undefined'
            ){
                return res.render('400', {error: ""})
        }
        BrandModel.findOne({ name: req.body.brand.name }).exec((err, _brand) => {
            if(err){
                return next();
            }
            var brand = new BrandModel(req.body.brand);
            brand.createDate = new Date();
            brand.save(err => {
                if(err){
                    return next();
                }           
                return res.redirect('/admin/brands');
            })
        });
    };
};