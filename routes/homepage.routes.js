const express = require('express');
const app = express();

app.get('/index', (request, response) => {
    response.render('pages/homepage');
});

module.exports = app;