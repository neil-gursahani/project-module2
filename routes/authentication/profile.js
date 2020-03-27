const express = require("express");
const app = express();
const User = require("../../models/User");

app.get("/profile", (req, res) => {
  res.render("user/profile", {profileData: req.session.currentUser});
});

module.exports = app;
