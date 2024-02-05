var express = require("express");
var router = express.Router();
const controller = require("../controllers/OrdersController");

router.post("/", function (req, res, next) {
  controller.createOrder(req, res);
})

router.get("/", (req, res) => {
  res.json({message: "Hello this is products microse2112rvice!"})
})
module.exports = router;