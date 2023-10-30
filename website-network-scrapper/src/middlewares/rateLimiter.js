const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
});

module.exports = {
  requestLimiter,
};
