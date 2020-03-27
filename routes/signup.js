const express = require("express");
const app = express();
const User = require("../models/User");

// Renders signUp form
app.get("/signup", (req, res) => {
  res.render("user/signup");
});

// Creates User
app.post("/signup", (req, res, next) => {
  const { username, password, firstName, lastName, email, city } = req.body;

  // validates not empty input for username and pass
  if (username === "" || password === "") {
    res.render("user/signup", {
      errorMessage: "Please fill in username and/or password"
    });
    return;
  } else if (username < 3 || password < 3 ) {
    res.render("user/signup", {
      errorMessage: "User name must be more than 3 characters"
    });
    return;
  }
  // checks if username or email exists
  User.findOne({ username: username })
    .then(user => {
      if (user !== null) {
        res.render(
          "user/signup",
          console.log("Username is already taken. Please try another one")
        );
        return;
      }

      User.create({
        username,
        password,
        firstName,
        lastName,
        email,
        city
      })
        .then(() => {
          res.render("user/login", {profileData: data = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            city: city
          }});
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = app;
