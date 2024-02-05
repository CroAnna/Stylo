var express = require("express");
var router = express.Router();
const controller = require("../controllers/invoiceController");

router.post(
  "/invoices",
  async (req, res) => {
    controller.sendInvoice(req, res);
  }
);

module.exports = router;
