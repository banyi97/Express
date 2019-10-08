const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
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