const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {

    return function (req, res, next) {
      if (typeof req.session.userid === 'undefined') {
        
      //  return res.redirect('/login');
      }
      res.locals.user = {name:"Hello"};
      return next();
    };
  
};