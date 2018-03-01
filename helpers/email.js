const nodemailer = require('nodemailer');
function sendEmail(mail, url, subject, callback) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'mail.jastip@gmail.com',
            pass: 'hacktiv8jastip',
        }
    });

    let mailOptions = {
        from: 'mail.jastip@gmail.com',
        to: mail,
        subject: subject,
        html:
            `
<html>
  <head></head>
  <body>
    <b>Click link below to activate J.a.s.t.i.p account!</b><br>
    <a href='${url}'>${subject}</a>
  </body>
</html>
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        callback(error, info)
    });
}
module.exports = sendEmail;
