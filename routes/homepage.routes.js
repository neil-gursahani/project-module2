const express = require('express');
const app = express();

app.get('/index', (request, response) => {
    response.render('homepage');
});

module.exports = app;