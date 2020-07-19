const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  firstName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  bio: {
    type: String,
    maxlength: 200,
  },
  avatar: {
    type: String,
  },
  background: {
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
    website: {
      type: String,
    },
    githup: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("profiles", ProfileSchema);
