const { checkFile } = require("../utils/file.utils");

module.exports.photoProfile = (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { avatar, background } = req.files;

  let errors = {};
  if (avatar) {
    errors = checkFile(avatar);
  }
  if (background) {
    errors = checkFile(background);
  }

  if (errors.size)
    return res
      .status(400)
      .send({ error: "File size must be less than or equal 10 mb." });

  if (errors.type)
    return res
      .status(400)
      .send({ error: "File type should be jpg , jpeg or png." });

  req.avatar = avatar;
  req.background = background;
  next();
};

