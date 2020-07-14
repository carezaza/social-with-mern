const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstName: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["CLIENT", "ADMINISTRATOR", "SUPERUSER"],
    default: "CLIENT",
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("users", UserSchema);
