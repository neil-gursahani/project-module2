const express = require("express");
const app = express();
const User = require("../models/User");

// Renders login form
app.get("/login", (req, res, next) => {
  res.render("user/login");
});

app.post("/login", (res, req, next) => {
  
  const theUsername = req.body.username;
  console.log("req.body.username", req.body.username)
  const thePassword = req.body.password;
  console.log("req.body.password", req.body.password)

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
      return;
    }
  });
  
  if ({password: thePassword}) {
    res.render("pages/welcomePage");
  } else {
    res.render("user/login", {
      errorMessage: "Username or password is not correct. Please try again"
    });
  }
});

module.exports = app;
