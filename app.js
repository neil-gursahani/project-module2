const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
require('dotenv').config();


mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('process.env.db', process.env.db);
    console.log('Connected to db');
  })
  .catch(error => {
    console.log('Not connected to db, error:', error);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('pages/homepage');
});

app.use('/', require('./routes/welcomePage'));
app.use('/', require('./routes/signup'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/profile'));

app.listen(process.env.PORT, () => {
  console.log('Webserver is listening on port', process.env.PORT);
});


