const express = require("express");
const morgan = require("morgan"); 
const compression = require("compression"); // Middleware for compressing HTTP responses
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const helmet = require("helmet"); // Middleware for setting security-related HTTP headers
const cors = require("cors"); 
const passport = require("passport");
const expressSession = require("express-session");

const host = require("../middleware/getHost");
const config = require("../config/config");

const middleware = [
  express.json({ limit: "16kb" }),
  express.urlencoded({ extended: true, limit: "16kb" }),
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }), // Middleware for compressing HTTP responses
  cookieParser(), // Middleware for parsing cookies
  expressSession({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
  morgan("dev"),
  helmet(), // Helmet middleware for setting security-related HTTP headers
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend origin
    credentials: true, // Must be true for cookies
  }),
  host,
  passport.initialize(),
  passport.session(),
];

module.exports = middleware;
