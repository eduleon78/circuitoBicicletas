const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lesly65@ethereal.email',
        pass: '1NbbJ7WbHNYCRtn2nZ'
    }
};

module.exports = nodemailer.createTransport(mailConfig);