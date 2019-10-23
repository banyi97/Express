const requireOption = require('../requireOption');

// Visszaadja az osszes rendelest - admin persission only
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');

    return function (req, res, next) {       
        OrderModel.find({}).exec((err, orders) => {
            if(err){
                return next();
            }
            res.locals.orders = orders;
            return next();
        //    return res.status(200).send(brands = _brands);
        });
    };
};