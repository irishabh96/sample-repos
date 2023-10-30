const express = require('express');
const scraperRoute = require('./scraper.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/scraper',
    route: scraperRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
