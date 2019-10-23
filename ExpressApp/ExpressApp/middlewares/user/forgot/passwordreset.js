const requireOption = require('../../requireOption');
 
// Az emailben kapott adatokkal tovabbit az oldalra
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.query === 'undefined' ||
            typeof req.query.token === 'undefined'
            ){
            return res.redirect('/forgot');
        }
        UserModel.findOne({ token: req.query.token }).exec((err, user) => {
            if(!user) {
                return res.status(400).send({ message: "Not a valid token" });
            }
            res.locals.forgot = false;
            res.locals.email = user.email;
            res.locals.hash = user.token;
            return next();   
        });
    };
  
};