const options = {
  maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days in milliseconds
  secure: process.env.NODE_ENV === "production" ? true : false,
  httpOnly: true,
};

module.exports = options;
