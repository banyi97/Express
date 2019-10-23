const requireOption = require('../requireOption');

// Tovabbitja az error szoveget - login and register page only
module.exports = function (obj) {
    return function (req, res, next) {     
      if(res.locals.errors){
          return next();
      }
      else{
          res.locals.errors = null;
          return next();
      }
    };
};