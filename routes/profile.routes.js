const express = require("express");
const router = express.Router();
const fs = require("fs");

// Utils and middleWares
const { isAuthenticated } = require("../middlewares/auth");
const { photoProfile } = require("../middlewares/profile");
const { genAccessToken } = require("../utils/jwt.utils");

// Mongodb model
const ProfileModel = require("../models/profile.model");

router.get("/who/:id", isAuthenticated, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.params.id,
    }).populate("");

    if (!profile) return res.status(400).send({ error: "Profile not found" });

    res.json(profile);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/edit/bio", isAuthenticated, async (req, res) => {
  const { bio } = req.body;
  try {
    await ProfileModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: { bio: bio } }
    );
    res.send({ success: "Edit bio successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/edit/photo", isAuthenticated, photoProfile, async (req, res) => {
  try {
    const profilesPath = `${__dirname}/../client/build/uploads/profiles/${req.user.id}`;
    if (!fs.existsSync(`${profilesPath}`)) {
      fs.mkdirSync(`${profilesPath}`);
    }
    if (req.avatar) {
      req.avatar.mv(`${profilesPath}/avatar.png`);
      if (!req.profile.avatar) {
        req.profile.avatar = `/uploads/profiles/${req.user.id}/avatar.png`;

        await req.profile.save();
        
        const accessToken = genAccessToken({
          sub: req.user.id,
          email: req.user.email,
          tokenVersion: req.user.tokenVersion,
          firstName: req.profile.firstName,
          lastName: req.profile.lastName,
          avatar: req.profile.avatar,
        });

        res.header(process.env.ACCESS_TOKEN_NAME, `Bearer ${accessToken}`);
      }
    }

    if (req.background) {
      req.background.mv(`${profilesPath}/background.png`);
      if (!req.profile.background) {
        req.profile.background = `/uploads/profiles/${req.user.id}/background.png`;

        await req.profile.save();
      }
    }

    return res.send(req.profile);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/edit/social", isAuthenticated, async (req, res) => {
  try {
    const { social } = req.body;
    await ProfileModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: { social: social } }
    );
    res.send({ success: "Updated social successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/follow/:userId", isAuthenticated, async (req, res) => {
  try {
    //check exist profile that user wanna following
    const profile = await ProfileModel.findOne({ user: req.params.userId });
    if (!profile) return res.status(400).send({ error: "Profile not found." });

    const existMe = profile.followers.find(
      (f) => f.user.toString() === req.user.id.toString()
    );

    //check for unFollowing if exist
    if (existMe) {
      const removeFollowerIndex = profile.followers
        .map((f) => f.user)
        .indexOf(req.user.id);

      profile.followers.splice(removeFollowerIndex, 1);
      await profile.save();

      const existP = req.profile.following.findIndex(
        (f) => f.user === profile.user
      );
      if (existP) {
        req.profile.following.splice(existP, 1);
        await req.profile.save();
      }
      return res.send(profile);
    }

    // following if not exist
    profile.followers.unshift({
      user: req.user.id,
      firstName: req.profile.firstName,
      lastName: req.profile.lastName,
      avatar: req.profile.avatar,
    });
    await profile.save();
    req.profile.following.unshift({
      user: profile.user,
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatar: profile.avatar,
    });
    await req.profile.save();
    return res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.get("/people/:skip", isAuthenticated, async (req, res) => {
  const length = await ProfileModel.countDocuments();
  const skip = parseInt(req.params.skip);
  ProfileModel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(3)
    .then((p) => {
      return res.send({ people: [...p], enough: skip + 3 >= length });
    })
    .catch((err) => {
      console.log(error);
      res.status(400).send({ error: error.message });
    });
});

module.exports = router;
