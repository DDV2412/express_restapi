const jwt = require('jsonwebtoken')
const errorHandler = require("../helper/Error-Handler");

function get_token(auth_header) {
    let header_split = auth_header.split(' ')
    if(header_split.length > 1) {
        return header_split[1]
    }
    return header_split[0]
}

function authorize(req, res, next) {
    if(typeof req.headers['authorization'] != "string") {
        return next(new errorHandler("UNAUTHORIZED", 401));
    }
    let token = get_token(req.headers['authorization'])
    let payload = null
    try{
        payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return next(new errorHandler("UNAUTHORIZED", 401));
    }
    req.user = payload.user
    req.is_admin = payload.is_admin
    next()
}

module.exports = authorize