// import cheerio from 'cheerio';
const cheerio = require('cheerio');
// import axios from 'axios';
const axios = require('axios');
// import { SocksProxyAgent } from 'socks-proxy-agent';
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

const pasteArr = [];

const getAllPaste = async () => {
  const $ = cheerio.load(await request(url));

  $('.col-sm-12').each((i, el) => {
    const pasteObj = {};
    pasteObj.title = getTitle($, el) ? getTitle($, el) : 'No Title';
    pasteObj.author = getAuthor($, el);
    pasteArr.push(pasteObj);
  });
  console.log(pasteArr);
};
getAllPaste();

/* Get the title from paste*/
const getAuthor = ($, el) => {
  const authorDiv = $(el).find('.col-sm-6').first().text();
  const author = authorDiv.split(' ')[2];
  return author;
};

const getTitle = ($, el) => {
  return $(el)
    .find('.col-sm-5')
    .text()
    .replace(/\n|\t|\r/g, '');
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
