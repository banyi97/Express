const requireOption = require('../requireOption');
 
module.exports = function (obj) {
    return function (req, res, next) {       
        res.locals.address = true;
        return next();
    };
};