const errorHandler = require("../helpers/error-handler");
const { encode } = require("../helpers/jwt");

module.exports = {
  Register: async (req, res, next) => {
    const newCustomer = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      noPhone: req.body.noPhone,
      password: req.body.password,
    };

    let customer = await req.authUC.Register(newCustomer);

    customer = {
      id: customer["id"],
      userName: customer["userName"],
      firstName: customer["firstName"],
      lastName: customer["lastName"],
      email: customer["email"],
      photoProfile: customer["photoProfile"],
      isAdmin: customer["isAdmin"],
    };
    const token = encode(customer);

    res.json({
      message: "Berhasil mendaftarkan customer baru.",
      customer: customer,
      token: token,
    });
  },

  Login: async (req, res, next) => {
    let customer = await req.authUC.Login(req.body.userName, req.body.password);

    if (!customer)
      return next(
        new errorHandler("Customer name atau password tidak sesuai.", 400)
      );

    customer = {
      id: customer["id"],
      userName: customer["userName"],
      firstName: customer["firstName"],
      lastName: customer["lastName"],
      email: customer["email"],
      photoProfile: customer["photoProfile"],
      isAdmin: customer["isAdmin"],
    };
    const token = encode(customer);

    res.json({
      message: "Berhasil Login.",
      customer: customer,
      token: token,
    });
  },
};
