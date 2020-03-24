require("dotenv").config();
const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> {
      console.log("Connected to db");
  })
  .catch((error)=> {
      console.log("Not connected to db, error:", error);
  });

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
// app.set("views", __dirname + "/views"); we might need this
// hbs.registerPartials(__dirname + '/views/partials'); comment out when use partials

app.get('/', function (req, res) {
  res.send('Hello World');
});
 
app.use('/', require('./routes/homepage'));
app.use('/', require('./routes/welcomePage'));
app.use('/', require('./routes/tripPage'));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.port, () => {
    console.log("Webserver is listening");
});

