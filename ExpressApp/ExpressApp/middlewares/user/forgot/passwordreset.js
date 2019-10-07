const requireOption = require('../../requireOption');
 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  
            typeof req.query === 'undefined' ||
            typeof req.query.token === 'undefined'
            ){
            return res.redirect('/forgot');
        }
        UserModel.findOne({ token: req.query.token }).exec((err, user) => {
            console.log(req.query.token)
            console.log(user)
            if(!user) {
                return res.status(400).send({ message: "Not a valid token" });
            }
            res.locals.forgot = false;
            res.locals.email = user.email;
            res.locals.hash = user.token;
            return next();   
        });
    };
  
};