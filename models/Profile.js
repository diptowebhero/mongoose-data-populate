const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    address: String,
    phone: Number,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);
module.exports = Profile;
