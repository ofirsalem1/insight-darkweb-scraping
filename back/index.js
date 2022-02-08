const express = require('express');
const app = express();
const port = 8080 || process.env.PORT;
const mongoose = require('mongoose');
require('dotenv').config();
// const { getAllPaste } = require('./scraping/scrape');
const insertData = require('./routers/insertDataRouter');

const mongo = process.env.DATA_BASE;

mongoose
  .connect(mongo)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err);
  });

app.get('/', async (req, res) => {
  // const response = await getAllPaste();
  res.send('response');
});
app.use('/insert-data', insertData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
