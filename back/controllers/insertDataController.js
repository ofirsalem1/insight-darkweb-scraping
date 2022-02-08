const Paste = require('../db/models/Paste');
const { getAllPaste } = require('../scraping/scrape');

const insertData = async (req, res) => {
  try {
    const response = await getAllPaste();
    for (const paste of response) {
      Paste.create(paste);
    }
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { insertData };
