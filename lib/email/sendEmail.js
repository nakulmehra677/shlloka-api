var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nakulmehra677@gmail.com',
        pass: '.adgjmptw01'
    }
});

const sendEmail = (receiverEmail, subject, text, html) => {

    var mailOptions = {
        from: 'nakulmehra677@gmail.com',
        to: receiverEmail,
        subject: subject,
        text: text,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;
