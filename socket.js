const socketIo = require("socket.io");

let io;

const initSockets = (server) => {
  // Initialize socket.io with the server
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Listen for orders from the menu page
    socket.on("new-order", (order) => {
      console.log("Order received:", order);

      // Emit the order update to all connected clients
      io.emit("order-update", order);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { initSockets };
