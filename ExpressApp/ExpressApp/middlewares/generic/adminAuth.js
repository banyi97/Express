const requireOption = require('../requireOption');

// Megvizsgalja hogy az user admin-e
module.exports = function (obj) {
    return function (req, res, next) {
      if (res.locals.user.permission === 'admin') {     
        return next();
      }
      return res.render('403', {error: ""})
    };
};