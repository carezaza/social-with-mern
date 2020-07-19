export const checkFile = (file) => {
  const errors = {};
  if (file.size > 10 * 1024 * 1024) {
    errors.size = true;
  }

  if (
    file.type !== "image/png" &&
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg"
  ) {
    errors.type = true;
  }

  if(!errors.size && !errors.type){
      return false;
  }
  return errors;
};
