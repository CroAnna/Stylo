var express = require("express");
var router = express.Router();
const controller = require("../controllers/HomepageController");

router.get("/", function (req, res, next) {
  controller.getHomepage(req, res);
});

module.exports = router;
