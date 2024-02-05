var express = require("express");
var router = express.Router();
const controller = require("../controllers/LayoutController");

router.get("/", function (req, res, next) {
  controller.getLayout(req, res);
});

module.exports = router;
