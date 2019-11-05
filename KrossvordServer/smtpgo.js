'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.smtp2go.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "toghrulgasimov@gmail.com", // generated ethereal user
            pass: "0557717295t0505" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Krossvord" <turabqasimov@gmail.com>', // sender address
        to: 'toghrulgasimov@gmail.com', // list of receivers
        subject: 'Qalib ✔', // Subject line
        text: ' ashagidaki linkden goture bilersiniz', // plain text body
        html: '<b>Bizim le bu nikden elaqe saxlayin</b><img src="http://35.227.46.95/ggg" alt="Flowers in Chania">' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
