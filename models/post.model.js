const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles",
  },
  photo: {
    type: String,
  },
  content: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      content: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      avatar: {
        type: String,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("posts", PostSchema);
