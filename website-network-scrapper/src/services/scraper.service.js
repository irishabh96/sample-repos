const { Scraper } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Save metadata of a url
 * @param {Object} metadata - all the metadata of a particular url
 * @returns {Promise<scrapeResult>}
 */
const storeScrapeResult = async (metadata) => {
  return await Scraper.create(metadata);
};

const queryScrapeResult = async (filter, options) => {
  return await Scraper.find().limit(10);
};

module.exports = {
  storeScrapeResult,
  queryScrapeResult,
};
