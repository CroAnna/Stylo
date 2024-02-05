var express = require("express");
const jwt = require("jsonwebtoken");
const controller = require("../controllers/CustomersController");

var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

router.get("/getJWT",(req, res) => {
  res.type('json')
  if (req.session.jwt != null) {
      jwt.verify(req.session.jwt, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
        const payload = decoded;
      res.send({ jwt: controller.generateAccessToken(req,res,payload)});
      })
  }
  else 
    return res.status(401).json({ error: 'Not logged in' });
})

module.exports = router;
