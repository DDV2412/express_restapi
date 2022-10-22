const nodemailer = require("nodemailer");
const loggerWinston = require("./logs-winston");

const sendMail = async (dataEmail) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "816424e9bc131b",
        pass: "7650fd6ca6af61",
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
