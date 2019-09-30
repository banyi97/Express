const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
      if (res.locals.user.permission === 'admin') {     
        return next();
      }
      return res.redirect('/error403');
    };
};