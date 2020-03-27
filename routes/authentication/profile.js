const express = require('express');
const app = express();
const User = require('../../models/User');

app.get('/profile', (req, res) => {
  res.render('user/profile', {profileData: req.session.currentUser});
});

// app.get('/profile/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then((user)=> {
//       res.render('user/profile/', {profileData: user});
//     })
// });

module.exports = app;
