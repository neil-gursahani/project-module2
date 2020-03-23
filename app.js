const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');

mongoose.connect(3000 , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> {
      console.log("Connected to db");
  })
  .catch((error)=> {
      console.log("Not connected to db, error:", error);
  });

app.set('view engine', 'hbs');
// app.set("views", __dirname + "/views"); we might need this
// hbs.registerPartials(__dirname + '/views/partials'); comment out when use partials


app.get('/', function (req, res) {
  res.send('Hello World');
});
 
app.listen(3000);
