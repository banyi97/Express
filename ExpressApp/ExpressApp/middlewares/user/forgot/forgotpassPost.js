const requireOption = require('../../requireOption');
const sgMail = require('@sendgrid/mail');
const nanoid = require('nanoid')
 // If the user is not logged in, redirects to login page/
module.exports = function (obj) {
    const UserModel = requireOption(obj, 'User');

    return function (req, res, next) {
        if (  // page get request
            typeof req.body.user === 'undefined' ||
            typeof req.body.user.email === 'undefined'
            ){
            return res.redirect('/forgot');
        }
        UserModel.findOne({ email: req.body.user.email }).exec((err, user) => {
            if(!user) {
                return res.status(200).send("user is not found"); //error, but no send valid data for to the client
            }
            user.token = nanoid();
            user.save((err) => {
                if(err){
                    return next();              
                }
                else{
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: user.email,
                        from: 'test@example.com',
                        templateId: 'd-480f0e7c53ac47a683792b4d283c6c04',
                        dynamic_template_data: {
                            subject: 'Forgot password',
                            name: user.firstName,
                            token: user.token
                            },
                        };
                    sgMail.send(msg);
                }
            });
            return res.status(200).send('ok');  
        });
    };
  
};