require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendMail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });
    return (
    transporter.sendMail(dataEmail)
    .then(info => console.log(`Email Terkirim ${info.response}`))
    .catch(err => console.log(err))
    )
}
