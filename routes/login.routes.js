const express = require("express");
const app = express();
const User = require("../models/User.Model");

// Renders login form
app.get("/login", (res, req) => {
  res.render("user/login");
});

app.post("/login", (res, req, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  // check for empty input
  if (theUsername === "" || thePassword === "") {
    res.render("user/login", {
      errorMessage: "Please fill in both username and password to log in."
    });
    return;
  }
  //authenticates user
  User.findOne({ username: theUsername }).then(user => {
    if (!user) {
      res.render("user/login", {
        errorMessage: "Username or password is not correct. Please try again"
      });
    }
    return;
  });
  if ({ password: thePassword }) {
    res.redirect("user/profile");
  } else {
    res.render("user/login", {
      errorMessage: "Username or password is not correct. Please try again"
    });
  }
});

module.exports = app;
