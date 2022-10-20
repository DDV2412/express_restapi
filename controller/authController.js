const errorHandler = require("../helpers/Error-Handler");
const { encode } = require("../helpers/jwt");
const validation = require("../validation");
const sendMail = require("../helpers/nodemailer");
const jwt = require("jsonwebtoken");

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

    if (!customer)
      return next(new errorHandler("Email atau username tidak tersedia.", 400));

    customer = {
      id: customer["id"],
      userName: customer["userName"],
      firstName: customer["firstName"],
      lastName: customer["lastName"],
      email: customer["email"],
      photoProfile: customer["photoProfile"],
      isAdmin: customer["isAdmin"],
      verified: customer["verified"],
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
      verified: customer["verified"],
    };
    const token = encode(customer);

    res.json({
      message: "Berhasil Login.",
      customer: customer,
      token: token,
    });
  },

  ForgotPassword: async (req, res, next) => {
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const checkEmail = await req.customerUC.GetByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 403));
    }

    let reset = await req.authUC.ForgotPassword(req.body["email"]);

    if (reset == null) {
      return next(new errorHandler("Email not available", 403));
    }

    await sendMail({
      from: "Usaha Rakyat <noreply@usaharakyat.com>",
      to: req.body["email"] + "<" + req.body["email"] + ">",
      subject: `Password Reset Request for Usaha Rakyat`,
      text:
        "To reset your password, please click the link below.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "\n" +
        "/api/reset-password?token=" +
        encodeURIComponent(reset) +
        "&email=" +
        req.body["email"],
      message: `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <p>
       To reset your password, please click the link below"</p>
       
       <a href="${req.protocol} +
        "://" +
        ${req.get("host")} +
        "\n" +
        "/api/reset-password?token=" +
       ${encodeURIComponent(reset)} +
        "&email=" +
        ${req.body["email"]}">${req.protocol} +
        "://" +
        ${req.get("host")} +
        "\n" +
        "/api/reset-password?token=" +
       ${encodeURIComponent(reset)} +
        "&email=" +
        ${req.body["email"]}</a>
    </div>
    
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`,
    });

    res.json({
      status: "success",
      message: `Email sent to ${req.body.email} successfully`,
    });
  },
  ResetPassword: async (req, res, next) => {
    const { token, email } = req.query;

    const { error } = validation.resetPassword(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    if (req.body["password"] !== req.body["confirmPassword"]) {
      return next(new errorHandler("Password not match", 400));
    }

    let reset = await req.authUC.ResetPass(token, email, req.body["password"]);

    if (reset == null) {
      return next(
        new errorHandler(
          "Token has expired. Please try password reset again.",
          400
        )
      );
    }

    await sendMail({
      from: "Usaha Rakyat <noreply@usaharakyat.com>",
      to: email + "<" + email + ">",
      subject: `Usaha Rakyat Password Changed`,
      text: "We've channeled our psionic energy to change your Usaha Rakyat account password. Gonna go get a seltzer to calm down.",
      message: `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <p>
       We've channeled our psionic energy to change your <strong>Usaha Rakyat</strong> account password. Gonna go get a seltzer to calm down.</p>
       
       
    </div>
    
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`,
    });

    res.json({
      status: "success",
      message: `Password reset. Please login with your new password.`,
    });
  },
  RequestVerify: async (req, res, next) => {
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const checkEmail = await req.customerUC.GetByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 403));
    }

    const verifyToken = await jwt.sign(
      {
        email: req.body.email,
      },
      String(process.env.JWT_SECRET),
      { expiresIn: "15m" }
    );

    await sendMail({
      from: "Usaha Rakyat <noreply@usaharakyat.com>",
      to: req.body["email"] + "<" + req.body["email"] + ">",
      subject: `Usaha Rakyat Verification Email`,
      text:
        "To verification email, please click the link below.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "\n" +
        "/api/verify-email?token=" +
        verifyToken,
      message: `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <p>
       To verify your email, please click the link below"</p>
      <a href="${req.protocol} +
        "://" +
        ${req.get("host")} +
        "\n" +
        "/api/verify-email?token=" +
       ${verifyToken}">${req.protocol} +
        "://" +
        ${req.get("host")} +
        "\n" +
        "/api/verify-email?token=" +
       ${verifyToken}</a>
       
       
    </div>
    
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`,
    });

    res.json({
      status: "success",
      message: `Email sent to ${req.body.email} successfully`,
    });
  },
  VerifyEmail: async (req, res, next) => {
    const { token } = req.query;

    const decodedData = await jwt.verify(
      String(token),
      String(process.env.JWT_SECRET)
    );

    if (Date.now() > decodedData["exp"] * 1000)
      return next(new errorHandler("Token expired", 400));

    const checkEmail = await req.customerUC.GetByEmail(decodedData["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 403));
    }

    const update = await req.authUC.VerifyEmail(decodedData.email);

    if (update == null) {
      return next(new errorHandler("Cannot verify this email, try again", 403));
    }

    res.json({
      status: "success",
      message: "Email verified successfully",
    });
  },
};
