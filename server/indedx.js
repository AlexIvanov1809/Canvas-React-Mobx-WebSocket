const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  console.log("Connected");
  ws.send("You are connected");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "message":
        console.log(msg.message);
        break;
      default:
        break;
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));

function connectionHandler(ws, msg) {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(`User ${msg.username} is connected`);
    }
  });
}
