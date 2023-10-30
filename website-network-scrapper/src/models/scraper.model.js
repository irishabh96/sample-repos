const mongoose = require('mongoose');
const { URL_CHECK } = require('../validations/regex');
const { toJSON, paginate } = require('./plugins');

const scraperSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!URL_CHECK.test(value)) {
          throw new Error('Invalid format for redirect url');
        }
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isRedirected: {
      type: Boolean,
      required: true,
      default: false,
    },
    redirectedUrl: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!URL_CHECK.test(value)) {
          throw new Error('Invalid format for redirect url');
        }
      },
    },
    ASNInformation: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    securityDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    naturalLanguageContent: {
      type: String,
      required: true,
    },
    screenshotPath: {
      type: String,
      required: true,
      trim: true,
    },
    pageSource: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
scraperSchema.plugin(toJSON);
scraperSchema.plugin(paginate);

/**
 * @typedef Scrape
 */
const Scrape = mongoose.model('scrape', scraperSchema);

module.exports = Scrape;
