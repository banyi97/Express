const requireOption = require('../requireOption');

// Modositja a kosar tartalmat
module.exports = function (obj) {
    return function (req, res, next) {  
        console.log(req.body.cartItem)
        if (  
            typeof req.body.cartItem === 'undefined' ||
            typeof req.body.cartItem.id === 'undefined' ||
            typeof req.body.cartItem.newQuant === 'undefined' 
            ){
                return res.render('400', {error: ""})
        }
        if (typeof req.session.cart === 'undefined') {     
            res.locals.cart = null;
            return res.status(200).send();
        }
        else{
            var cart = req.session.cart;
            cart.forEach(element => {
                if(element.id ==req.body.cartItem.id){
                    element.quant = req.body.cartItem.newQuant;
                }
            });
            return res.status(200).send();
        }
    };
};