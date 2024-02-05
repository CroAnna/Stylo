var express = require("express");
var router = express.Router();
const { query, body } = require("express-validator");
const controller = require("../controllers/CustomersController");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

router.get("/", (req, res) => {
  controller.getAllCustomers(req, res);
});

router.get("/:email", async (req, res) => {
  controller.getCustomerByEmailAddress(req, res);
});

router.post("/login", async (req, res) => {
  controller.login(req, res);
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401);
  if (refreshTokens.includes(refreshToken))
    return res.status(403).json({ error: "Refresh token exists!" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, customer) => {
      if (err) return res.status(403);
      else {
        const accessToken = jwt.sign(
          customer,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ accessToken: accessToken });
      }
    }
  );
});

router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email format"),
  body("first_name").exists().withMessage("First name should not be empty"),
  body("last_name").exists().withMessage("Last name should not be empty"),
  body("phone_number").exists().withMessage("Phone number should not be empty"),
  async (req, res) => {
    controller.signup(req, res);
  }
);

router.post("/activate", async (req, res) => {
  controller.activateAccount(req, res);
});

router.delete("/:userId", async (req, res) => {
  controller.deleteAccount(req, res);
})

module.exports = router;
