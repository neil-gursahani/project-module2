const express = require('express');
const app = express();

app.get('/index', (request, response) => {
    response.render('index');
});

module.exports = app;