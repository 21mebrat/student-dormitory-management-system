
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can replace it with another service (e.g., Yahoo, Outlook)
  auth: {
    user: 'maytotmat@gmail.com',  
    pass: 'kumqqqhabbeyqjae',     
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"DMU SDMS" <maytotmat@gmail.com>',  // Sender address
      to,  // Receiver's email address
      subject,  // Subject line
      html,  // HTML content
    });
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;  // You can handle this differently depending on your needs
  }
};

module.exports = { sendEmail };
