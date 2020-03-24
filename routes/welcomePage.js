const express = require('express');
const app = express();
const User = require('../models/User.Model');

app.get('/welcome', (request, response) => {
    User
        .find()
        .then((userInfo) => {
            response.render('pages/welcomePage', {userHbs: userInfo});
        })
        .catch((error) => {
            response.send(error);
        });
});

module.exports = app;