const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();


const sendEmail = async (to, subject, text) => {

  // Create a transporter using Gmail
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAIL_PASSWORD,
      },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
