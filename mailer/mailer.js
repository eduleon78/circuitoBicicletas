const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aliza.moen@ethereal.email',
        pass: 'xaF9E3jStVVgrKmXfu'
    }
};

module.exports = nodemailer.createTransport(mailConfig);