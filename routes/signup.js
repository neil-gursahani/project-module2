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
    res.render("user/signup", console.log("Invalid username or password"));
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
      // else if (email !== null) {
      //   res.render("user/signup", {
      //       err: console.log("It looks like this email is already in use. Try another one or log in")
      //   });
      //   return;
      // }
      //create User
      User.create({
        username,
        password,
        firstName,
        lastName,
        email,
        city
      })
        .then(() => {
          res.render("user/profile", {profileData: data = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            city: city
          }}); //redirects to profile hbs
          // console.log("profileData", data)
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