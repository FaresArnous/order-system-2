const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { initSockets } = require("./socket");

const menuRoutes = require("./routers/menu");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

initSockets(server);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(menuRoutes);

server.listen(3030, process.env.IP);
