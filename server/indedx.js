const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const ENDPOINT = '/api/image';

app.use(express.json());

app.ws('/', (ws, req) => {
  console.log('Connected');
  ws.on('message', (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg);
        break;
      case 'draw':
        broadcastConnection(ws, msg);
        break;
      default:
        break;
    }
  });
});

app.post(ENDPOINT, (req, res) => {
  try {
    const data = req.body.img.replace('data:image/png;base64,', '');
    fs.writeFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
      data,
      'base64',
    );
    return res.json({ message: 'Downloaded' });
  } catch (e) {
    console.log(e);
    return res.status(500).json('Error');
  }
});
app.get(ENDPOINT, (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
    );
    const data = 'data:image/png;base64,' + file.toString('base64');
    return res.json(data);
  } catch (e) {
    return res.status(500).send({ message: 'Error' });
  }
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));

function connectionHandler(ws, msg) {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}
