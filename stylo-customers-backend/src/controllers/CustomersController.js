const jwt = require("jsonwebtoken");
const service = require("../services/CustomersService");
const { validationResult } = require("express-validator");

async function getAllCustomers(req, res) {
  const customers = await service.getAllCustomers();
  res.json(customers);
}

async function getCustomerByEmailAddress(req, res) {
  const email = req.params.email;
  const customer = await service.getCustomerByEmailAddress(email);
  if (customer.results.length > 0) {
    return res.status(200).json(customer.results[0]);
  } else {
    return res.status(404).json({ error: "Customer doesn't exist" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const response = await service.loginCustomer(email, password);
    const customer = response.customer;

    if (!customer.isEmailVerified) {
      return res
        .status(401)
        .json({ error: "Email address of account not verified!" });
    }
    const token = generateAccessToken(req,res,customer);
    const refreshToken = jwt.sign(customer, process.env.REFRESH_TOKEN_SECRET);

    return res.status(200).json({
      success: "Login successful.",
      status: 200,
      customer: customer,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Account with the given credentials not found." });
  }
}

function generateAccessToken(req,res,customer)
{
  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: process.env.KID,
  };
  const payload = {
    sub: customer.id,
    email: customer.email,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    header: header,
    expiresIn: "1h",
  });
  req.session.jwt = token
  return token
}


async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { first_name, last_name, email, password, phone_number } = req.body;

  try {
    const response = await service.registerCustomer(
      first_name,
      last_name,
      email,
      password,
      phone_number
    );
    const customer = response.customer;
    const token = await service.getActivationToken(customer.id);
    service.sendActivationMail(email, token);
    return res.status(200).json({ customer });
  } catch (err) {
    return res
      .status(err.response.data.statusCode)
      .json({ Error: err.response.data.message });
  }
}

async function activateAccount(req, res) {
  const token = req.query["activation_token"];
  try {
    const response = await service.activateMail(token);
    const customer = response.data;
    return res.status(200).json({ customer });
  } catch (err) {
    return res.status(401).json({ error: "Could not activate account" });
  }
}

async function deleteAccount(req, res) {
  const id = req.params.userId;
  try {
    const deleted = await service.deleteAccount(id);
    if(deleted.status != 500)
      return res.status(200).json({success: "User account successfully deleted"})

  } catch (err) {
    return res.status(err.response.status).json({error: err.response.data.message})
  }
}

module.exports = {
  getAllCustomers,
  getCustomerByEmailAddress,
  login,
  signup,
  activateAccount,
  generateAccessToken,
  deleteAccount
};
