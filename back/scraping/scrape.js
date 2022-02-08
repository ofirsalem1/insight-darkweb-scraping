const cheerio = require('cheerio');
const axios = require('axios');
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

const getAllPaste = async () => {
  try {
    const $ = cheerio.load(await request(url));
    const pasteArr = [];
    // $('.col-sm-12').each(async (i, el) => {
    const patseDivArr = $('.col-sm-12');
    for (let el of patseDivArr) {
      const pasteObj = {};
      pasteObj.author = getAuthor($, el) ? getAuthor($, el) : 'No Author';
      pasteObj.title = getTitle($, el) ? getTitle($, el) : 'No Title';
      pasteObj.content = await getContent($, el);
      pasteObj.date = getDate($, el);
      pasteArr.push(pasteObj);
    }
    // });
    pasteArr.pop(); // delete to last element because it is undefined
    pasteArr.shift(); // delete to first element because it is undefined
    return pasteArr;
  } catch (error) {
    console.log(error);
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

/* Get the full content from paste*/
const getContent = async ($, el) => {
  const showPasteURL = $(el).find('.btn').attr('href');
  if (showPasteURL) {
    const $paste = cheerio.load(await request(showPasteURL));
    return $paste('ol')
      .text()
      .replace(/\n|\t|\r/g, '');
  }
};

/* Get the date from paste*/
const getDate = ($, el) => {
  const dateDiv = $(el).find('.col-sm-6').first().text();
  const date = dateDiv
    .split(' ')
    .slice(4)
    .join(' ')
    .replace(/\n|\t|\r/g, '');
  return date;
};

module.exports = { getAllPaste };
