var express = require("express");
var router = express.Router();
const controller = require("../controllers/ProductsController");

router.get("/", function (req, res, next) {
  controller.getAllProducts(req, res);
});

router.get("/list", function (req, res, next) {
  controller.getProductsList(req, res);
});

router.get("/filter", function (req, res, next) {
  controller.getFilteredProducts(req, res);
});

router.get("/:id", function (req, res, next) {
  controller.getProductById(req, res);
});

module.exports = router;
