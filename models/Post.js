const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
