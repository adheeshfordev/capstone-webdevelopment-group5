const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const decodedPassword = Buffer.from(process.env.EMAIL_PASSWORD, 'base64').toString('utf8');


const sendEmail = async (to, subject, text) => {

  // Create a transporter using Gmail
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL, 
          pass: decodedPassword,
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
