const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PROT,
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports = function ({ to, subject, text }) {
    const emailOptions = {
        to,
        text,
        from: process.env.EMAIL_FROM,
        subject: subject || 'Email from ollyo career alert script'
    };
    if (!process.env.EMAIL_FROM || !to || !text) throw new Error(`from, to and text fields are required found => from: ${process.env.EMAIL_FROM} to: ${to} text: ${text}`);

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}