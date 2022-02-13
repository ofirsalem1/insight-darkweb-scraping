const Paste = require('../db/models/Paste');

const clients = [];

const getData = async (req, res) => {
  try {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers); // for sse connection

    const allPaste = await Paste.find({});
    const data = `data: ${JSON.stringify(allPaste)}\n\n`;
    res.write(data);
    // res.send(allPaste);

    // const newUser = res;
    // clients.push(newUser);
    // remove client from array when they disconnect
    // req.on('close', () => {
    //   clients.splice(clients.indexOf(newUser), 1);
    // });
  } catch (error) {
    console.log(error);
    res.write(error);
  }
};
module.exports = { getData };
