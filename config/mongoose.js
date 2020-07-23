const mongoose = require("mongoose");

module.exports = (server) => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.gzia1.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then((res) => {
      const io = require("../socket").init(server);
      io.on("connection", (socket) => console.log("Client connected"));
    })
    .catch((error) => console.log(error));
};
