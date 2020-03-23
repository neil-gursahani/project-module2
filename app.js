require("dotenv").config()
const express = require('express')
const app = express()
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect(process.env.db , {
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
 

app.listen(process.env.port, () => {
    console.log("Webserver is listening");
});

