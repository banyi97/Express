const requireOption = require('../requireOption');
const path = require('path');
 // If the user is not logged in, redirects to login page/
 
module.exports = function (dir, name) {
    return function (req, res, next) {     
     return res.sendFile(path.join(dir + '/html/'+ name));
    };
};