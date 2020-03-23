const express = require('express');
const app = express();

app.get('/welcome', (request, response) => {
    User
        .find()
        .then((userInfo) => {
            response.render('welcomePage', {userHbs: userInfo});
        })
        .catch((error) => {
            response.send(error);
        });
});

module.exports = app;