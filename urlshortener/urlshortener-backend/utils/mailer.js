const nodemailer = require('nodemailer');

exports.sendActivationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '<Your_Email>',
      pass: '<Your_Email_Password>',
    },
  });

  const activationLink = `${process.env.BASE_URL}/activate?token=${token}`;
  const mailOptions = {
    from: 'noreply@urlshortener.com',
    to: email,
    subject: 'Activate Your Account',
    html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
