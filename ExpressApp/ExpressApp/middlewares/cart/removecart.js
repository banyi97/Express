const requireOption = require('../requireOption');

// Torli a kosarbol a kapott termek
module.exports = function (obj) {
    return function (req, res, next) {     
        if (
            typeof req.query === 'undefined' ||
            typeof req.query.id === 'undefined') {    
                return res.status(200).send();
        }
        else{         
            var cart = req.session.cart;
            console.log(cart);
            var arr = [];
            cart.forEach(element => {
                if(element.id != req.query.id){
                    arr.push(element);
                }
            });
            req.session.cart = arr.length > 0 ? arr : undefined;
            
            return res.status(200).send();
        }
    };
};