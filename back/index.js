const express = require('express');
const app = express();
const port = 8080 || process.env.PORT;
const { getAllPaste } = require('./scraping/scrape');

app.get('/', async (req, res) => {
  const response = await getAllPaste();
  res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
