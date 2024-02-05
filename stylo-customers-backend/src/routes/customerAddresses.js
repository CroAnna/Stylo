var express = require("express");
var router = express.Router();
const { query, body } = require("express-validator");
const controller = require("../controllers/CustomerAddressController");
const jwt = require("jsonwebtoken");

let refreshTokens = [];


router.post("/addAddress", async (req, res) => {
  controller.addAddress(req, res);
});

router.put("/changeAddress", async (req, res) => {
  controller.changeAddress(req, res);
});

module.exports = router;
