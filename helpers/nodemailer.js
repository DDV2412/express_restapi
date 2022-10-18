require("dotenv").config();
const nodemailer = require("nodemailer");
const loggerWinston = require("./logs-winston");

exports.sendMail = (dataEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  return transporter
    .sendMail(dataEmail)
    .then((info) => loggerWinston.info(`E-mail Terkirim ${info.response}`))
    .catch((err) => loggerWinston.error(err));
};
