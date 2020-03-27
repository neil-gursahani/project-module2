const express = require("express");
const app = express();
const User = require("../../models/User");

app.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      res.render("user/logout");

    });
  });


module.exports = app;