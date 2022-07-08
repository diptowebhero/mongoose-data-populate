const express = require("express");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");
const usersRoute = express.Router();

//POST A USER
usersRoute.post("/addUser", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(200).json({
      data: result,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an server side error",
    });
  }
});
//POST USER PROFILE
usersRoute.post("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, address, phone, post } = req.body;
    const profile = new Profile({
      title,
      address,
      phone,
      post,
      user: userId,
    });
    const data = await profile.save();
    const updateResult = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { profile: data._id } },
      { new: true }
    );
    res.status(200).json({
      result: updateResult,
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an server side error",
    });
  }
});

//add post
usersRoute.post("/addPost/:profileId", async (req, res) => {
  try {
    const profileId = req.params.id;
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
      profile: profileId,
    });

    const profileData = await post.save();
    console.log(profileData);
    const updateResult = await Profile.findOneAndUpdate(
      { profileId },
      { $push: { posts: profileData._id } },
      { new: true }
    );
    res.send(updateResult);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an server side error",
    });
  }
});

usersRoute.get("/", async (req, res) => {
  try {
    const result = await User.find({}).populate({ path: "profile" });
    for (let doc of result) {
      await Profile.populate(doc.profile, { path: "posts" });
    }
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an server side error",
    });
  }
});

module.exports = usersRoute;
