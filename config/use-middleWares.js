const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

module.exports = (app) => {
  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  } else {
    app.use(morgan("dev"));
  }
  app.use(cookieParser());
  app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};
