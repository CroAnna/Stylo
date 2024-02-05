var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
var cors = require('cors')

var indexRouter = require("./src/routes/index");
var customersRouter = require("./src/routes/customers");
var customerAddressesRouter = require("./src/routes/customerAddresses")

var app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 3 },
    resave: false
}));
app.use("/", indexRouter);
app.use("/customers", customersRouter);
app.use("/customers", customerAddressesRouter)

module.exports = app;
