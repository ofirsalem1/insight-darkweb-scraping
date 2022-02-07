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

  $('.col-sm-12').each(async (i, el) => {
    const pasteObj = {};
    pasteObj.author = getAuthor($, el) ? getAuthor($, el) : 'No Author';
    pasteObj.title = getTitle($, el) ? getTitle($, el) : 'No Title';
    pasteObj.content = await getContent($, el);
    pasteArr.push(pasteObj);
    console.log(pasteArr);
  });
};

getAllPaste();

const getContent = async ($, el) => {
  const showPasteURL = $(el).find('.btn').attr('href');
  if (showPasteURL) {
    const $paste = cheerio.load(await request(showPasteURL));
    return $paste('ol').text();
  }
};

/* Get the author from paste*/
const getAuthor = ($, el) => {
  const authorDiv = $(el).find('.col-sm-6').first().text();
  const author = authorDiv.split(' ')[2];
  return author;
};

/* Get the title from paste*/
const getTitle = ($, el) => {
  return $(el)
    .find('.col-sm-5')
    .text()
    .replace(/\n|\t|\r/g, '');
};
