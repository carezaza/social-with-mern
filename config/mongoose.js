const { config } = require("dotenv");
config();
const mongoose = require("mongoose");

const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_NAME } = process.env;

module.exports = () => {
  mongoose
    .connect(
      `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@cluster0.gzia1.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("MongoDb connected"))
    .catch((error) => console.log(error));
};
