const requireOption = require('../requireOption');
// Rendered the page
module.exports = function (obj, viewName) {
    
    return function (req, res) {
        res.render(viewName);
    };

};