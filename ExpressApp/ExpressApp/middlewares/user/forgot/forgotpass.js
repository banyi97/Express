const requireOption = require('../../requireOption');
const sgMail = require('@sendgrid/mail');

 // If the user is not logged in, redirects to login page/
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        res.locals.forgot = true;
        return next();   
    };
};