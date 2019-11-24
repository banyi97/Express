const requireOption = require('../requireOption');

// Modositja az adott rendeles statuszat
module.exports = function (obj) {
    const OrderModel = requireOption(obj, 'Order');

    return function (req, res, next) {       
        OrderModel.findOne({_id: req.body.order.id}).exec((err, order) => {
            if(err){
                return res.status(400).send()
            }
            order.state = req.body.order.state;
            order.save(err => {
                if(err){
                    return res.status(400).send();
                }           
                return res.status(200).send();
            })
        });
    };
};