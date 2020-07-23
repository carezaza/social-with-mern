module.exports.checkFile = (file) => {
  const errors = {};
  if (file.size > 10 * 1024 * 1024) {
    errors.size = true;
  }

  if (
    file.mimetype !== "image/png" &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/gif"
  ) {
    errors.type = true;
  }
  return errors;
};
