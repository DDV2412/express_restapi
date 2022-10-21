require("dotenv").config();
const nodemailer = require("nodemailer");
const loggerWinston = require("./logs-winston");

const sendMail = async (dataEmail) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    return transporter.sendMail({
      from: dataEmail["from"],
      to: dataEmail["to"],
      subject: dataEmail["subject"],
      text: dataEmail["text"],
      html: dataEmail["message"],
    });
  } catch (error) {
    loggerWinston.error(err);
  }
};

module.exports = sendMail;
