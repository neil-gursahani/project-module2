const express = require("express");
const app = express();
const User = require("../models/User");

// Renders signUp form
app.get("/signup", (req, res) => {
  res.render("user/signup");
});

// Creates User

app.post("/signup", (req, res, next) => {
  debugger
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    male,
    female,
    other,
    city,
    street,
    houseNumber
  } = req.body;

  const address = {
    city,
    street,
    houseNumber
  }
  const gender = {
    male,
    female,
    other
  }
  console.log(req.body)
  // validates not empty input for username and pass
  // if (username === "" || password === "") {
  //   res.render("user/signup", {
  //     errorMessage: "Invalid username or password.)"
  //   });
  //   return;
  // }
  // checks if username or email exists
  User.findOne({ username: username})
    .then(user => {
      debugger
      if (user !== null) {
        res.render("user/signup", {
          errorMessage: "Username is already taken. Please try another one"
        });
        return;
      // } else if (email !== null) {
      //   res.render("user/signup", {
      //     errorMessage:
      //       "It looks like this email is already in use. Try another one or log in"
      //   });
        // return;
      }
      //create User
      User.create({
        username ,
        password,
        firstName,
        lastName,
        email,
        gender: {
male, female, other
        },
        address: {
          city,
          street,
          houseNumber
        }
      })
      .then(user => {
        debugger
          res.redirect("user/profile"); //redirects to profile hbs
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
