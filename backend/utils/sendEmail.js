const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, text }) => {
  // send Email with nodemailer
  // const nodeMailerOptions = {
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "",
  //     pass: "",
  //   },
  // };

  const nodeMailerOptions = {
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "",
    },
    domain: "itsproali.me",
  };

  // 1. create transporter
  const transporter = nodemailer.createTransport(nodeMailerOptions);

  // 2. define email options
  const mailOptions = {
    from: "admin@itsproali.me",
    to: email,
    subject: subject,
    text: text,
  };

  // 3. send email
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
