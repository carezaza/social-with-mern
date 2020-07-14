const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");


module.exports = (app) => {
  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  } else {
    app.use(morgan("dev"));
  }
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

};
