const Paste = require('../db/models/Paste');

const getData = async (req, res) => {
  try {
    const allPaste = await Paste.find({});
    res.send(allPaste);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { getData };
