const express = require("express");
const router = express.Router();
const fs = require("fs");
const io = require("../socket");

// Utils and middleWares
const { isAuthenticated } = require("../middlewares/auth");
const { isHasContent } = require("../middlewares/post");

// Mongodb model
const PostModel = require("../models/post.model");
const ProfileModel = require("../models/profile.model");

router.post("/create", isAuthenticated, isHasContent, async (req, res) => {
  try {
    const post = await PostModel.create({
      user: req.user.id,
      profile: req.profile.id,
    });

    if (req.content) {
      post.content = req.content;
    }

    if (req.photo) {
      const postPath = `${__dirname}/../client/build/uploads/posts/${post.id}`;
      if (!fs.existsSync(`${postPath}`)) {
        fs.mkdirSync(`${postPath}`);
      }
      req.photo.mv(`${postPath}/post.png`); 
      post.photo = `/uploads/posts/${post.id}/post.png`;
    }

    await post.save();
    const p = await PostModel.findById(post.id).populate("profile", [
      "avatar",
      "firstName",
      "lastName",
    ]);
    res.send(p);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await PostModel.findOne({
      $and: [{ _id: req.params.postId }, { user: req.user.id }],
    });

    const postPath = `${__dirname}/../client/build/uploads/posts/${req.params.postId}`;
    if (fs.existsSync(`${postPath}`)) {
      fs.rmdirSync(`${postPath}`, { recursive: true });
    }

    await post.remove();
    res.send({ success: "Deleted post successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/like/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate(
      "profile",
      ["firstName", "lastName", "avatar"]
    );
    if (!post) return res.status(400).send({ error: "Post not found." });
    if (post.likes.find((like) => like.user.toString() === req.user.id)) {
      // post.likes.filter((like) => like.user.toString() !== req.user.id);
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
    } else {
      post.likes.unshift({
        user: req.user.id,
        firstName: req.profile.firstName,
        lastName: req.profile.lastName,
        avatar: req.profile.avatar,
      });
    }
    post.save().then((p) => {
      // realtime liking
      io.getIO().emit("post", { action: "like", p });
      res.send({ success: "Liking successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/comment/:postId", isAuthenticated, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).send({ error: "No content commented." });
  try {
    const post = await PostModel.findById(req.params.postId).populate(
      "profile",
      ["firstName", "lastName", "avatar"]
    );
    if (!post) return res.status(400).send({ error: "Post not found." });

    const { firstName, lastName } = req.profile;
    post.comments.push({
      user: req.user.id,
      content,
      firstName,
      lastName,
      avatar: req.profile.avatar,
    });

    post.save().then((p) => {
      // realtime commenting.
      io.getIO().emit("post", { action: "comment", p });
      res.send({ success: "Commented successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.delete(
  "/comment/:postId/:commentId",
  isAuthenticated,
  async (req, res) => {
    try {
      const post = await PostModel.findById(
        req.params.postId
      ).populate("profile", ["firstName", "lastName", "avatar"]);
      if (!post) return res.status(400).send({ error: "Post not found." });
      const comment = post.comments.find(
        (c) => c._id.toString() === req.params.commentId.toString()
      );

      if (!comment)
        return res.status(400).send({ error: "Comment not found." });

      if (
        post.user.toString() === req.user.id.toString() ||
        comment.user.toString() === req.user.id.toString()
      ) {
        const removeIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.commentId);

        post.comments.splice(removeIndex, 1);

        post.save().then((p) => {
          io.getIO().emit("post", { action: "delete", p });
          res.send({ success: "Deleted successfully." });
        });
      } else {
        return res.status(403).send({ error: "Deleted access denied." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

router.get("/fetch/:id/:page", isAuthenticated, async (req, res) => {
  const length = await PostModel.find({ user: req.params.id }).countDocuments();
  const page = parseInt(req.params.page);
  const skip = 3 * page;
  PostModel.find({ user: req.params.id })
    .populate("profile", ["firstName", "lastName", "avatar"])
    .sort({
      postedAt: -1,
    })
    .skip(skip)
    .limit(3)
    .then((posts) => {
      res.send({ posts, hasMore: skip + 3 < length });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: error.message });
    });
});

router.get("/:page", isAuthenticated, async (req, res) => {
  const length = await PostModel.countDocuments();
  const page = parseInt(req.params.page);
  const skip = 3 * page;
  PostModel.find()
    .populate("profile", ["firstName", "lastName", "avatar"])
    .sort({ postedAt: -1 })
    .skip(skip)
    .limit(3)
    .then((posts) => {
      res.send({ posts, hasMore: skip + 3 < length });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: error.message });
    });
});

router.get("/notifications", isAuthenticated, async (req, res) => {
  res.send("notifications");
});

module.exports = router;
