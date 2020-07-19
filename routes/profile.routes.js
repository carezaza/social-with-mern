const express = require("express");
const router = express.Router();
const fs = require("fs");

// Utils and middleWares
const { isAuthenticated } = require("../middlewares/auth");
const { photoProfile } = require("../middlewares/profile");

// Mongodb model
const ProfileModel = require("../models/profile.model");

router.post("/who/:id", isAuthenticated, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.params.id });

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
    const profile = await ProfileModel.findOne({ user: req.user.id });
    const profilesPath = `${__dirname}/../client/public/uploads/profiles/${req.user.id}`;
    if (!fs.existsSync(`${profilesPath}`)) {
      fs.mkdirSync(`${profilesPath}`);
    }
    if (req.avatar) {
      req.avatar.mv(`${profilesPath}/avatar.png`);
    }

    if (req.background) {
      req.background.mv(`${profilesPath}/background.png`);
    }

    if (!profile.avatar || !profile.background) {
      profile.avatar = `/uploads/profiles/${req.user.id}/avatar.png`;
      profile.background = `/uploads/profiles/${req.user.id}/background.png`;
      // await ProfileModel.findOneAndUpdate(
      //   { user: req.user.id },
      //   {
      //     $set: {
      //       avatar: `/uploads/profiles/${req.user.id}/avatar.png`,
      //       background: `/uploads/profiles/${req.user.id}/background.png`,
      //     },
      //   }
      // );
      await profile.save();
    }

    return res.send({ success: "Uploaded photo successfully." });
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
        .map((f) => f.user.toString())
        .indexOf(req.user.id.toString());

      profile.followers.splice(removeFollowerIndex, 1);
      await profile.save();

      if (
        req.profile.following.find(
          (f) => f.user.toString() === profile.user.toString()
        )
      ) {
        const removeFollowingIndex = req.profile.following
          .map((f) => f.user.toString())
          .indexOf(profile.user.toString());
        req.profile.following.splice(removeFollowingIndex, 1);
        await req.profile.save();
      }
      return res.send(profile);
    }

    // following if not exist
    profile.followers.unshift({ user: req.user.id });
    await profile.save();
    req.profile.following.unshift({ user: profile.id });
    await req.profile.save();
    return res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
