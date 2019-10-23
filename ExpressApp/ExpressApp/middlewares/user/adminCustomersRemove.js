const requireOption = require('../requireOption');
 
// Torli a kapott id-ju usert
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {   
        if ( typeof req.query.id === 'undefined' ){
            return res.render('400', {error: ""})
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