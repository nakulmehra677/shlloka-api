const sendEmail = require("../sendEmail");

const verifyEmail = (email, name, link) => {    
    const subject = "Email Verification"
    const text = `Hey ${name},\n` + 
    `You are almost ready to use our platform. Click the link below to verify your email address. This link is valid for only 10 minutes.\n\n` +
    `${link}\n\n`+
    `If you have not signed up please ignore this email.\n\n\n` +
    `Regards,\n` +
    `Team Shlloka`;

    sendEmail(email, subject, text, null);
}

module.exports = verifyEmail;