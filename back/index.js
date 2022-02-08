const express = require('express');
const app = express();
const port = 8080 || process.env.PORT;
const mongoose = require('mongoose');
require('dotenv').config();
const insertDataRouter = require('./routers/insertDataRouter');
const getDataRouter = require('./routers/getDataRouter');
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
  res.send('response');
});

app.use('/insert-data', insertDataRouter);
app.use('/get-data', getDataRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
