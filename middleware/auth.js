const { decode } = require("../helpers/jwt");
const errorHandler = require("../helpers/Error-Handler");

const get_token = (auth_header) => {
  let header_split = auth_header.split(" ");
  if (header_split.length > 1) {
    return header_split[1];
  }
  return header_split[0];
};

const authentication = (req, res, next) => {
  if (typeof req.headers["authorization"] != "string") {
    return next(new errorHandler("UNAUTHORIZED", 401));
  }

  let token = get_token(req.headers["authorization"]);

  let payload = null;

  try {
    payload = decode(token);
  } catch (error) {
    return next(new errorHandler("UNAUTHORIZED", 401));
  }

  req.customerUC.GetById(payload["id"]).then((data) => {
    if (data == null) {
      return next(new errorHandler("UNAUTHORIZED", 401));
    }
  });

  req.Customer = payload;

  req.Admin = false;

  if (payload.isAdmin == true) {
    req.Admin = true;
  }

  next();
};
const authorization = (req, res, next) => {
  if (!req.Admin) {
    return next(new errorHandler("UNAUTHORIZED", 401));
  }
  next();
};

module.exports = {
  authentication,
  authorization,
};
