const requireOption = require('../requireOption');

// Ellenorzi a jogosultsagot
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {     
      if (typeof req.session.userid === 'undefined') {     
          return res.redirect('/login');
      }
      UserModel.findOne({ _id: req.session.userid }).exec((err, user) => {
        if(err){
          return res.redirect('/login');
        }
        res.locals.user = user;
        return next();
      });
    };
};