const errorHandler = require("../helper/Error-Handler");

function admin (req, res, next) {
    if(!req.is_admin) {
        return next(new errorHandler("UNAUTHORIZED", 401));
    }
    next()
}

module.exports = admin;

