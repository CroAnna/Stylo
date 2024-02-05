var express = require("express");
var router = express.Router();
const controller = require("../controllers/CategoriesController");

router.get("/:gender", function (req, res, next) {
  controller.getSubcategories(req, res);
});

module.exports = router;
