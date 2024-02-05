//importing modules
const nodemailer = require("nodemailer");

//function to send email to the user
module.exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
      },
    });
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendingMailWithAttachment = async ({ from, to, subject, text, attachments }) => {
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
      attachments
    };

    const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
      },
    });
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};