const errorHandler = require("../helpers/Error-Handler");
const { encode } = require("../helpers/jwt");
const validation = require("../validation");
const sendMail = require("../helpers/nodemailer");
const jwt = require("jsonwebtoken");

module.exports = {
  Register: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication register'
      #swagger.description = 'Authentication register'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication register',
            required: true,
            schema: {
              "userName": "Admin",
              "firstName": "Admin",
              "lastName": "Admin",
              "email": "admin@mail.com",
              "password": "123456"
            }
          },
      #swagger.responses[200] = {
            description: 'Register successfully.',
            schema: {
                    "message": "Berhasil Register.",
                    "customer": {
                        "id": "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
                        "userName": "Customer",
                        "firstName": "Customer",
                        "lastName": "Binar",
                        "email": "customer@mail.com",
                        "photoProfile": "-",
                        "isAdmin": false,
                        "verified": null
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0YmZjMzk3LTMwZDgtNDA3My1iYTRkLWU3N2VhNGRiYzhlNiIsInVzZXJOYW1lIjoiQ3VzdG9tZXIiLCJmaXJzdE5hbWUiOiJDdXN0b21lciIsImxhc3ROYW1lIjoiQmluYXIiLCJlbWFpbCI6ImN1c3RvbWVyQG1haWwuY29tIiwicGhvdG9Qcm9maWxlIjoiLSIsImlzQWRtaW4iOmZhbHNlLCJ2ZXJpZmllZCI6bnVsbCwiaWF0IjoxNjY2MzMzMjUzLCJleHAiOjE2NjYzMzY4NTN9.WDwo7PFKExl9Bx2I5knAWn5Fp8haT9oHtufwuV7nE0Y"
            }
      }
      #swagger.responses[400] = {
            description: 'Register error.',
            schema: {
                    success: false,
                    "message": "Email atau username tidak tersedia.",
            }
      }
      */
    const { error } = validation.register(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    let customer = await req.authUC.Register(req.body);

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
      success: true,
      message: "Berhasil mendaftarkan customer baru.",
      customer: customer,
      token: token,
    });
  },

  Login: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication login'
      #swagger.description = 'Authentication login'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication login',
            required: true,
            schema: {
              "userName": "Admin",
              "password": "123456"
            }
          },
      #swagger.responses[200] = {
            description: 'Login successfully.',
            schema: {
                    "message": "Berhasil Login.",
                    "customer": {
                        "id": "54bfc397-30d8-4073-ba4d-e77ea4dbc8e6",
                        "userName": "Customer",
                        "firstName": "Customer",
                        "lastName": "Binar",
                        "email": "customer@mail.com",
                        "photoProfile": "-",
                        "isAdmin": false,
                        "verified": null
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0YmZjMzk3LTMwZDgtNDA3My1iYTRkLWU3N2VhNGRiYzhlNiIsInVzZXJOYW1lIjoiQ3VzdG9tZXIiLCJmaXJzdE5hbWUiOiJDdXN0b21lciIsImxhc3ROYW1lIjoiQmluYXIiLCJlbWFpbCI6ImN1c3RvbWVyQG1haWwuY29tIiwicGhvdG9Qcm9maWxlIjoiLSIsImlzQWRtaW4iOmZhbHNlLCJ2ZXJpZmllZCI6bnVsbCwiaWF0IjoxNjY2MzMzMjUzLCJleHAiOjE2NjYzMzY4NTN9.WDwo7PFKExl9Bx2I5knAWn5Fp8haT9oHtufwuV7nE0Y"
            }
      }
      #swagger.responses[400] = {
            description: 'Register error.',
            schema: {
                    success: false,
                    "message": "Customer name atau password tidak sesuai.",
            }
      }
      */
    const { error } = validation.login(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

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
      success: true,
      message: "Berhasil Login.",
      customer: customer,
      token: token,
    });
  },

  ForgotPassword: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication Forgot Password'
      #swagger.description = 'Authentication Forgot Password'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Forgot Password',
            required: true,
            schema: {
              "email" : "admin@mail.com"
            }
          },
      #swagger.responses[200] = {
            description: 'Forgot Password',
            schema: {
                    success: true,
                    "message": "Email sent to ${req.body.email} successfully",
            }
      }
      #swagger.responses[400] = {
            description: 'Forgot Password error.',
            schema: {
                    success: false,
                    "message": "Email not available",
            }
      }
      */
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const checkEmail = await req.customerUC.GetByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 400));
    }

    let reset = await req.authUC.ForgotPassword(req.body["email"]);

    if (reset == null) {
      return next(new errorHandler("Email not available", 400));
    }

    await sendMail({
      from: "Usaha Rakyat <noreply@usaharakyat.com>",
      to: req.body["email"] + "<" + req.body["email"] + ">",
      subject: `Password Reset Request for Usaha Rakyat`,
      text:
        "Seems like you forgot your password for Usaha Rakyat. if this is true, click below to reset password\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "/api/reset-password?token=" +
        encodeURIComponent(reset) +
        "&email=" +
        req.body["email"],
      message: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Reset Password</title>
  </head>
  <body>
    <main style="padding: 0 1rem">
      <h1 style="width: 100%; text-align: center; font-weight: 600">LOGO</h1>
      <section
        style="
          margin: 10px 0;
          background-color: #e2e8f0;
          padding: 10px 20px;
          border-radius: 20px;
        "
      >
        <h2 style="text-align: center">Password Reset</h2>
        <p>
          Seems like you forgot your password for Usaha Rakyat. if this is true,
          click below to reset password.
        </p>
        <a
          href="${req.protocol}://${req.get(
        "host"
      )}/api/reset-password?token=${encodeURIComponent(reset)}&email=${
        req.body["email"]
      }"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: max-content;
            margin: 10px auto;
            text-align: center;
            background-color: #0369a1;
            color: white;
            font-weight: 500;
            padding: 10px 20px;
            border-radius: 10px;
            text-decoration: none;
          "
          >Reset My Password</a
        >
        <p>
          If you did not forgot your password you can safely ignore this email.
        </p>
      </section>
      <section>
        <p style="text-align: center; color: #94a3b8">
          Usaha Rakyat, San Francisco CA 94102<br />
          Dont like these emails? Unsubscribe.<br /><br />

          Power By Usaha Rakyat
        </p>
      </section>
    </main>
    <style>
      body {
        max-width: 600px;
        background-color: white;
        margin: 0 auto;
        padding: 0;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
    </style>
  </body>
</html>
`,
    });

    res.json({
      success: true,
      message: `Email sent to ${req.body.email} successfully`,
    });
  },
  ResetPassword: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication Reset Password'
      #swagger.description = 'Authentication Reset Password'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Reset Password',
            required: true,
            schema: {
              "password": "Ddv241297#",
              "confirmPassword": "Ddv241297#"
            }
          },
      #swagger.responses[200] = {
            description: 'Reset Password',
            schema: {
                    success: true,
                    "message": "Password reset. Please login with your new password.",
            }
      }
      #swagger.responses[400] = {
            description: 'Password not Match',
            schema: {
                    success: false,
                    "message": "Password not match",
            }
      }
      #swagger.responses[400] = {
            description: 'Reset Password error.',
            schema: {
                    success: false,
                    "message": "Token has expired. Please try password reset again.",
            }
      }
      */
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

    res.json({
      success: true,
      message: `Password reset. Please login with your new password.`,
    });
  },
  RequestVerify: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication Request Verify'
      #swagger.description = 'Authentication Request Verify'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Request Verify',
            required: true,
            schema: {
              "email" : "admin@mail.com"
            }
          },
      #swagger.responses[200] = {
            description: 'Request Verify',
            schema: {
                    success: true,
                    "message": "Email sent to ${req.body.email} successfully",
            }
      }
      #swagger.responses[400] = {
            description: 'Password not Match',
            schema: {
                    success: false,
                    "message": "Email not available",
            }
      }

      */
    const { error } = validation.forgotPass(req.body);

    if (error) return next(new errorHandler(error["details"][0].message, 400));

    const checkEmail = await req.customerUC.GetByEmail(req.body["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 403));
    }

    const verifyToken = jwt.sign(
      {
        email: req.body.email,
      },
      String(process.env.JWT_SECRET || "rahasia"),
      { expiresIn: "15m" }
    );

    await sendMail({
      from: "Usaha Rakyat <noreply@usaharakyat.com>",
      to: req.body["email"] + "<" + req.body["email"] + ">",
      subject: `Usaha Rakyat Verification Email`,
      text:
        "Please click the button below to verify your email address.\n\n" +
        req.protocol +
        "://" +
        req.get("host") +
        "/api/verify-email?token=" +
        verifyToken,
      message: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify Email</title>
  </head>
  <body>
    <main style="padding: 0 1rem">
      <h1 style="width: 100%; text-align: center; font-weight: 600">LOGO</h1>
      <section
        style="
          margin: 10px 0;
          background-color: #e2e8f0;
          padding: 10px 20px;
          border-radius: 20px;
        "
      >
        <h2 style="text-align: center">Verify This Email Address</h2>
        <p>
          Please click the button below to verify your email address.
        </p>
        <a
          href="${req.protocol}://${req.get(
        "host"
      )}"/api/verify-email?token=${verifyToken}"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: max-content;
            margin: 10px auto;
            text-align: center;
            background-color: #0369a1;
            color: white;
            font-weight: 500;
            padding: 10px 20px;
            border-radius: 10px;
            text-decoration: none;
          "
          >Verify Email</a
        >
        <p>
          If you did not forgot your password you can safely ignore this email.
        </p>
      </section>
      <section>
        <p style="text-align: center; color: #94a3b8">
          Usaha Rakyat, San Francisco CA 94102<br />
          Dont like these emails? Unsubscribe.<br /><br />

          Power By Usaha Rakyat
        </p>
      </section>
    </main>
    <style>
      body {
        max-width: 600px;
        background-color: white;
        margin: 0 auto;
        padding: 0;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
    </style>
  </body>
</html>`,
    });

    res.json({
      success: true,
      message: `Email sent to ${req.body.email} successfully`,
    });
  },
  VerifyEmail: async (req, res, next) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication Email Verify'
      #swagger.description = 'Authentication Email Verify'
      #swagger.responses[200] = {
            description: 'Email Verify',
            schema: {
                    success: true,
                    "message": "Email verified successfully",
            }
      }
      #swagger.responses[400] = {
            description: 'Password not Match',
            schema: {
                    success: false,
                    "message": "Email not available",
            }
      }

      */
    const { token } = req.query;

    const decodedData = jwt.verify(
      String(token),
      String(process.env.JWT_SECRET || "rahasia")
    );

    if (Date.now() > decodedData["exp"] * 1000)
      return next(new errorHandler("Token expired", 400));

    const checkEmail = await req.customerUC.GetByEmail(decodedData["email"]);

    if (!checkEmail) {
      return next(new errorHandler("Email not available", 400));
    }

    const update = await req.authUC.VerifyEmail(decodedData.email);

    if (update == null) {
      return next(new errorHandler("Cannot verify this email, try again", 400));
    }

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  },
};
