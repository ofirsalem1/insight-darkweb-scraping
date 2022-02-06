const axios = require('axios');
const { get } = require('request');
const { SocksProxyAgent } = require('socks-proxy-agent');

const proxy = 'socks5h://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);
const url = 'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all';

/* get the html page */
const request = async url => {
  try {
    const response = await axios({ url, httpAgent: agent });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const cheerio = require('cheerio');

const getData = async () => {
  const $ = cheerio.load(await request(url));
  getAllTitle($);
};
getData();

/* Get all the title */
const getAllTitle = $ => {
  $('.col-sm-12').each((i, el) => {
    const title = $(el).find('.col-sm-5').text();
    console.log(title);
  });
};

// const request = require('request');
// request(
//   'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all',
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html);

//       const siteHeading = $('.links-head');

//       // console.log(siteHeading.html());
//       // console.log(siteHeading.text());
//       // const output = siteHeading.find('a').text();
//       // const output = siteHeading.children('a').text();
//       const output = siteHeading.children('a').html();
//       console.log(output);
//     }
//     console.log(error);
//     // console.log(response.statusCode);
//   }
// );
