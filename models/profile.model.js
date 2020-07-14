const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  bio: {
    type: String,
    maxlength: 100,
  },
  avatar: {
    type: String,
  },
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  notifications: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    },
  ],
});

module.exports = model("profiles", ProfileSchema);
