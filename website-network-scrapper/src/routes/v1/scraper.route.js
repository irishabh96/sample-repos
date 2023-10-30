const express = require('express');
const validate = require('../../middlewares/validate');
const scraperValidation = require('../../validations/scraper.validation');
const scraperController = require('../../controllers/scraper.controller');

const router = express.Router();

router.post('/', validate(scraperValidation.scrapeUrl), scraperController.scrape);

router.get('/', scraperController.view);

module.exports = router;
