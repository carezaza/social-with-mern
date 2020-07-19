const { verifyAccessToken } = require("../utils/jwt.utils");
const UserModel = require("../models/user.model");
const ProfileModel = require("../models/profile.model");

module.exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers[process.env.ACCESS_TOKEN_NAME];
  if (!token) return res.status(401).send({ error: "Authorization denied." });
  try {
    const payload = verifyAccessToken(token.split(" ")[1]);
    const user = await UserModel.findById(payload.sub, "-password -salt");
    if (!user) return res.status(401).send({ error: "User not found." });

    if (user.tokenVersion !== payload.tokenVersion)
      return res.status(401).send({ error: "Authorization denied." });

    req.profile = await ProfileModel.findOne({ user: user.id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
