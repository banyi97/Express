const requireOption = require('../requireOption');

 // If the user is not logged in, redirects to login page/
 
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');

    return function (req, res, next) {       
        OrderModel.find({}).exec((err, orders) => {
            if(err){
                return next();
            }
            res.locals.orders = orders;
            return next();
        });
    };
};