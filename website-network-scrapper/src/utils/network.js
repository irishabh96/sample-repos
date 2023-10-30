const dns = require('dns');
const IPToASN = require('ip-to-asn');

const lookup = async (url) => {
  return new Promise((resolve, reject) => {
    console.log(`Checking IP address for ${url}`);
    url = new URL(url);

    dns.lookup(url.hostname, (err, address, family) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};

const checkASN = async (ip) => {
  return new Promise((resolve, reject) => {
    console.log(`Checking ASN for ${ip}`);
    const client = new IPToASN();

    client.query([ip], function (err, results) {
      if (err) {
        reject(err);
      }
      resolve(results[ip]);
    });
  });
};

module.exports = {
  checkASN,
  lookup,
};
