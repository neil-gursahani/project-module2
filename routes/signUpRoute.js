const express = require('express');
const app = express();
const User = require('../models/User.Model');

app.get('/signup', (req, res) => {
    res.render('user/signup');
});

module.exports = app;