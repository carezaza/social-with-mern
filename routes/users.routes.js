const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../middlewares/auth");
const {
  genAccessToken,
  genRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/jwt.utils");

router.post(
  "/register",
  [
    body("firstName").trim().isLength({ min: 3, max: 20 }),
    body("lastName").trim().isLength({ min: 3, max: 20 }),
    body("email").isEmail(),
    body("password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      const existErrors = {};
      const existFirstName = await UserModel.findOne({ firstName });
      if (existFirstName) {
        existErrors.firstName = "The firstName is already taken.";
      }

      const existLastName = await UserModel.findOne({ lastName });
      if (existLastName) {
        existErrors.lastName = "The lastName is already taken.";
      }

      const existEmail = await UserModel.findOne({ email });
      if (existEmail) {
        existErrors.email = "The email is already taken.";
      }

      if (existErrors.firstName || existErrors.lastName || existErrors.email) {
        return res.status(400).json(existErrors);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(salt + password, 10);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt: salt,
      });

      const { id, tokenVersion } = user;

      const accessToken = genAccessToken({
        sub: id,
        tokenVersion,
      });

      const refreshToken = genRefreshToken({
        sub: id,
        tokenVersion,
      });

      res.header(process.env.ACCESS_TOKEN_NAME, `Bearer ${accessToken}`);
      res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken);
      res.send({ success: "Your account has been registered." });
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 1 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //check if user not exist
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send({ error: "User not found." });  
      }
      //check if password not valid
      const isValid = await bcrypt.compare(user.salt + password, user.password);
      if (!isValid) {
        return res.status(400).send({ error: "Password incorrect." });
      }

      // generate accessToken and refreshToken
      const { id, tokenVersion } = user;
      const accessToken = genAccessToken({
        sub: id,
        tokenVersion,
      });

      const refreshToken = genRefreshToken({
        sub: id,
        tokenVersion,
      });

      res.header(process.env.ACCESS_TOKEN_NAME, `Bearer ${accessToken}`);
      res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken);
      res.send({ success: "Login successfully." });
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies[process.env.REFRESH_TOKEN_NAME];
    if (!token) {
      return res.status(401).send({ error: "Not authorized." });
    }
    const payload = verifyRefreshToken(token);
    const { sub } = payload;

    const user = await UserModel.findById(sub);
    if (!user) {
      return res.status(401).send({ error: "User not found." });
    }

    user.tokenVersion = user.tokenVersion + 1;
    user.save();
    res.clearCookie(process.env.REFRESH_TOKEN_NAME);
    res.send({ success: "Logout successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error);
  }
});

router.post("/resetToken", async (req, res) => {
  try {
    const token = req.cookies[process.env.REFRESH_TOKEN_NAME];
    if (!token) {
      return res.status(401).send({ error: "Not authorized." });
    }
    const payload = verifyRefreshToken(token);

    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return res.status(401).send({ error: "User not found." });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).send({ error: "Not authorized." });
    }

    const { id, tokenVersion } = user;
    const accessToken = genAccessToken({
      sub: id,
      tokenVersion,
    });

    res.header(process.env.ACCESS_TOKEN_NAME, `Bearer ${accessToken}`);
    res.send({ success: "Refresh token successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error);
  }
});

router.get("/me", isAuthenticated, async (req, res) => {
  const { email, firstName, lastName, role, createdAt } = req.user;
  res.json({ email, firstName, lastName, role, createdAt });
});

module.exports = router;
