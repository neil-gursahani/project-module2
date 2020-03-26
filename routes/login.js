const express = require('express');
const app = express();
const User = require('../models/User');

// Renders login form
app.get('/login', (req, res, next) => {
  res.render('user/login');
});

app.post('/login', (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === '' || thePassword === '') {
    res.render('user/login', {
      errorMessage: 'Please fill in both username and password to log in.'
    });
    return;
  }
// authentication for the user login
  User.findOne({ 'username': theUsername })
  .then(user => {
      if (!user) {
        res.render('user/login', {
          errorMessage: 'Username or password is not correct.Please try again!'
        });
        return;
      }
      else if (user.password === thePassword) {
        // saves login in, creates users session
        req.session.currentUser = user; 
        res.render('user/profile', {profileData: user});
      } else {
        res.render('user/login', {
          errorMessage: 'Username or password is not correct.Please try again!'
        });
      }
  })
  .catch(error => {
    next(error);
  })
});


module.exports = app;
