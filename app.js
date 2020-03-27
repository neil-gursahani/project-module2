const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // import body parser
const session    = require("express-session"); //express-session for login sessions
const MongoStore = require("connect-mongo")(session); //connect-mongo for login sessions
const cookie = require('cookie'); // use cookies
const cookieParser = require('cookie-parser') //use cookie parser
const path = require('path');
require('dotenv').config();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/fileUploads'));


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

app.use(bodyParser.urlencoded({ extended: true })); //body parser use
app.use(cookieParser()) // cookie parser use
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

// middleware to enable sessions in express 

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use((req,res,next)=> {
  if(req.session.currentUser){
    res.locals.currentUser = req.session.currentUser;
  }
  console.log(req.session)
  next();
})
app.get('/', (req, res, next) => {
  res.render('pages/homepage');
});
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./routes/homepage'));
app.use('/', require('./routes/welcomePage'));
app.use('/', require('./routes/tripPage'));
app.use('/', require('./routes/signup'));
app.use('/', require('./routes/login'));

// middleware for auth routes
app.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          
    res.redirect("/login");         
  }                                 
}); 
app.use('/', require('./routes/authentication/profile'));
app.use('/', require('./routes/authentication/edit'));
app.use('/', require('./routes/authentication/logout'));


app.listen(process.env.PORT, () => {
  console.log('Webserver is listening on port', process.env.PORT);
});


