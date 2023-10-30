const puppeteer = require('puppeteer');
const { checkASN, lookup } = require('../../utils/network');

const startScraper = async (url) => {
  let browser;
  try {
    if (!url) throw new Error('Invalid url passed to initiate puppeteer');

    url = new URL(url);

    let page;

    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    page = await browser.newPage();

    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    const securityDetails = await response.securityDetails();

    console.log('OK', 'for', url.hostname, response.ok());

    const ipAddress = await lookup(url);
    console.log(`IP address for url ${url} is - ${ipAddress}`);

    let title = await page.title();

    const screenshotPath = `screenshots/${url.hostname}-${Date.now()}.png`;

    console.log(`Taking screenshots for ${url.hostname}`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const result = {
      url: url.hostname,
      title: title,
      ipAddress,
      isRedirected: page.url() === url.origin,
      redirectedUrl: page.url(),
      ASNInformation: await checkASN([ipAddress]),
      browserVersion: await browser.version(),
      securityDetails: {
        protocol: securityDetails.protocol(),
        issuer: securityDetails.issuer(),
        subjectName: securityDetails.subjectName(),
        subjectAlternativeNames:
          typeof securityDetails.subjectAlternativeNames() === 'object'
            ? securityDetails.subjectAlternativeNames().toString()
            : securityDetails.subjectAlternativeNames(),
        validTo: securityDetails.validTo(),
        validFrom: securityDetails.validFrom(),
      },
      pageSource: await response.text(),
      naturalLanguageContent: await page.$eval('*', (el) => el.innerText),
      screenshotPath,
    };

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await browser.close();
    console.log('Task completed, browser closed');
  }
};

module.exports = {
  startScraper,
};
