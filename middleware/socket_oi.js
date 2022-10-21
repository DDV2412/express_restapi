const { decode } = require("../helpers/jwt");
const errorHandler = require("../helpers/Error-Handler");
const customerRepo = require("../repository/customerRepo");
const customerUseCase = require("../use_case/customerUseCase");

const customer = new customerUseCase(new customerRepo());

const get_token = (auth_header) => {
  let header_split = auth_header.split(" ");
  if (header_split.length > 1) {
    return header_split[1];
  }
  return header_split[0];
};

const authentication = (socket, next) => {
  if (typeof socket.handshake.headers["authorization"] != "string") {
    return next(new errorHandler("UNAUTHORIZED", 401));
  }

  let token = get_token(socket.handshake.headers["authorization"]);

  let payload = null;

  try {
    payload = decode(token);
  } catch (error) {
    return next(new errorHandler("UNAUTHORIZED", 401));
  }

  customer.GetById(payload["id"]).then((data) => {
    if (data == null) {
      return next(new errorHandler("UNAUTHORIZED", 401));
    }
  });

  socket.handshake.auth = payload;
  next();
};

module.exports = authentication;
