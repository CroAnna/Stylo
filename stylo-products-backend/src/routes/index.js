var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "Hello this is products microservice!" });
});

module.exports = router;
