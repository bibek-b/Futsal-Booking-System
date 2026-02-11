const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    //receive bookings
    socket.on("send-booking", (data) => {
      console.log("Booking received: " + data);
      //send bookings
      socket.broadcast.emit("receive-booking", data);
    });

    socket.on("remove-booking", (data) => {
      console.log("Start time received for remove: " + data.startTime);
      socket.broadcast.emit("receive-remove-booking", {
        startTime: data.startTime,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });
};

export default initSocket;
//use rooms for admin and user separately
