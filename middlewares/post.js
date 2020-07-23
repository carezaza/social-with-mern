const { checkFile } = require("../utils/file.utils");

module.exports.isHasContent = (req, res, next) => {
  if (req.files === null && req.body === null) {
    return res.status(400).send({ error: "No content posted." });
  }
  if (req.files) {
    if (req.files.photo) {
      const errors = checkFile(req.files.photo);
      if (errors.size)
        return res
          .status(400)
          .send({ error: "File size must be less than or equal 10 mb." });

      if (errors.type)
        return res
          .status(400)
          .send({ error: "File type should be jpg , jpeg or png." });
      req.photo = req.files.photo;
    }
  }

  if (req.body) {
    if (req.body.content) {
      req.content = req.body.content;
    }
  }
  next();
};
