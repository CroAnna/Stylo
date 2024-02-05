var express = require("express");
var router = express.Router();
const controller = require("../controllers/activationMail");

const { body } = require("express-validator");

router.post(
  "/activation",
  body("email").isEmail().withMessage("Invalid email format"),
  body("activation_token").notEmpty().withMessage("There is no token"),
  async (req, res) => {
    controller.sendActivationMail(req, res);
  }
);

module.exports = router;
