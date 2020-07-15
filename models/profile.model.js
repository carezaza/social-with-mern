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
  background: {
    type: String,
  },
  status: {
    type: String,
    required: true,
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
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    line: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("profiles", ProfileSchema);
