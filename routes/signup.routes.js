const express = require('express');
const app = express();
const User = require('../models/User.Model');

// Renders signUp form
app.get('/signup', (req, res) => {
  res.render('user/signup');
});

// Creates User

app.post('/signup', (req, res, next) => {
  const {
    username,
    password,
    firstname,
    lastname,
    email,
    gender,
    address
  } = req.body;

  // validates not empty input for username and pass
  if (username === '' || password === '') {
    res.render('user/signup', {
      errorMessage: 'Invalid username or password.)'
    });
    return;
  }
  // checks if username or email exists
  User.findOne({ username, email })
    .then(user => {
      if (user !== null) {
        res.render('user/signup', {
          errorMessage: 'Username is already taken. Please try another one'
        });
        return;
      } else if (email !== null) { 
        res.render('user/signup', {
          errorMessage:
            'It looks like this email is already in use. Try another one or log in'
        });
      }
      User.create({
        username,
        password,
        firstname,
        lastname,
        email,
        gender,
        address
      })
        .then(user => {
          res.redirect('user/profile'); //redirects to profile hbs
        })
        .catch(err => {
          res.send('User was not successfully created', err);
        });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = app;
