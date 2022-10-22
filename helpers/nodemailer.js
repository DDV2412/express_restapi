require("dotenv").config();
const nodemailer = require("nodemailer");
const loggerWinston = require("./logs-winston");

const sendMail = async (dataEmail) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.mailtrap.io",
      port: Number(process.env.MAIL_PORT) || 2525,
      secure: false,
      auth: {
        user: process.env.MAIL_USER || "816424e9bc131b",
        pass: process.env.MAIL_PASS || "7650fd6ca6af61",
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
