const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../../models/user");

//getting user
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
});

//saving a user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    //destructuring the req body
    const { name, email, password } = req.body;
    //checking whether the user with same email address exist
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    user = new User({
      name,
      email,
      password
    });

    const result = await user.save();
    res.send(user);
    console.log(result);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
