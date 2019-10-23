const requireOption = require('../requireOption');

 // Visszaadja az user adatokat ha bejelentkezett, illetve null-t ad vissza ha nem - ejs need this only
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {    
        if (typeof req.session.userid === 'undefined') {     
            res.locals.user = null;
            return next();
          }
          UserModel.findOne({ _id: req.session.userid }).exec((err, user) => {
            if(err){
              return res.redirect('/login');
            }
            res.locals.user = user;
            return next();
          });
    }
};