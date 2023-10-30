const Joi = require('joi');

const scrapeUrl = {
  body: Joi.object().keys({
    url: Joi.string().required().uri(),
  }),
};

module.exports = {
  scrapeUrl,
};
