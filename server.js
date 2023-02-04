require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("User with id: " + socket.id + " is connected!");
  const count = io.engine.clientsCount;
  io.emit("count", count);
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server running on port " + port);
});
