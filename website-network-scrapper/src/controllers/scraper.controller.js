const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { startScraper } = require('../tools/puppeteer');
const { scraperService } = require('../services');

const scrape = catchAsync(async ({ body }, res) => {
  const scraperResult = await startScraper(body.url);

  const result = await scraperService.storeScrapeResult(scraperResult);
  res.status(httpStatus.CREATED).send(result);
});

const view = catchAsync(async (req, res) => {
  const result = await scraperService.queryScrapeResult();
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  scrape,
  view,
};
