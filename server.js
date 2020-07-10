const { config } = require("dotenv");
config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(compression());
} else {
  app.use(morgan("dev"));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
