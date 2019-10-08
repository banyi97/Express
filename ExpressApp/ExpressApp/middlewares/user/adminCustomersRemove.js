const requireOption = require('../requireOption');
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {   
        console.log(req.query.id)
        if ( typeof req.query.id === 'undefined' ){
            return next();
        }
        UserModel.findOne({_id: req.query.id}).exec((err, user) => {
            user.remove(err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/admin/customers');
            })
        })
    };
  
};