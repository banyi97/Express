const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        console.log('called')
        if (  
            typeof req.body.brand === 'undefined' ||
            typeof req.body.brand.id === 'undefined' ||
            typeof req.body.brand.newName === 'undefined'
            ){
            return next("type error");
        }
        BrandModel.findOne({ _id: req.body.brand.id }).exec((err, brand) => {
            if(err){
                res.status(400).send("find error");
            }
            if(brand){
                brand.name = req.body.brand.newName;
                brand.save(err => {
                    if(err){
                        return res.status(400).send("save error");
                    }
                    return res.status(200).send(brand);
                })
            }
        });
    };
};