const { sendingMail } = require("../middlewares/mailer");
const { validationResult } = require("express-validator");
const link = "http://localhost:5173/user/activation"


async function sendActivationMail(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const email = req.body["email"];
  const token = req.body["activation_token"]
  try {
    sendingMail({
      from: "Stylo@gmail.com",
      to: `${email}`,
      subject: "Account Verification Link",
      text: `Hello, please activate your account using the following link: ${link}?activation_token=${token}`,
      html: `<p>Hello, please activate your account using the following link: <a href = ${link}?activation_token=${token}>Activation link</a></p>`
    });
    return res.status(200).json({ success: "Mail sent" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Couldn't send email" });
  }
}

module.exports = {
  sendActivationMail,
};
