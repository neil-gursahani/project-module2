const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.render('homepage');
});

module.exports = app;