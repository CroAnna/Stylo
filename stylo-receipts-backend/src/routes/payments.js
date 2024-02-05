var express = require("express");
var router = express.Router();
const controller = require("../controllers/PaymentsController");

router.post("/mobile/create", function (req, res, next) {
    controller.createPayment(req, res);
})

router.post("/web/create", function (req, res, next) {
    controller.createWebPayment(req, res);
})

module.exports = router;