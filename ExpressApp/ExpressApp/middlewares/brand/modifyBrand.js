const requireOption = require('../requireOption');

 // Modositjaz adott brand id-hoz tartozo adatokat a kapott adatokkal... ha nem letezik errort ad vissza
module.exports = function (obj) {
    const BrandModel = requireOption(obj, 'Brand');

    return function (req, res, next) {
        if (  
            typeof req.body.brand === 'undefined' ||
            typeof req.body.brand.id === 'undefined' ||
            typeof req.body.brand.newName === 'undefined'
            ){
                return res.render('400', {error: ""})
        }
        BrandModel.findOne({ _id: req.body.brand.id }).exec((err, brand) => {
            if(err){
                return res.render('404', {error: "Error"})
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
            else{
                return res.render('404', {error: ""})
            }
        });
    };
};