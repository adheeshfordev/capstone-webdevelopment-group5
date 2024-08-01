const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  // Create a test account if you don't have one
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
      },
  });
console.log(to);
console.log(subject);
console.log(text);
  const mailOptions = {
    from: '"Test Sender" <test@example.com>',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
