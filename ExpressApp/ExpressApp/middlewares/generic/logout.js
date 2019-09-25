const requireOption = require('../requireOption');
// Logout
module.exports = function (obj) {

    return function (req, res, next) {
      req.session.destroy(function (err) {
        return res.redirect('/');
      });
    };
  
};