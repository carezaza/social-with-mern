const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
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

module.exports = model("posts", ProfileSchema);
