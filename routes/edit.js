const express = require('express');
const app = express();
const User = require('../models/User')


app.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
    .then(data => {
        res.render(`user/edit`, {user: data})
    })
    .catch(err => console.log(err));
});

app.post('/edit', (req,res) => {
    let userId = req.body.id;
    console.log("req.body", req.body)
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        city: req.body.city
    }
    User
    .findByIdAndUpdate(userId, {new: true})
    .then(profileData => {
        // res.redirect(`/profile`)
        res.redirect(`/edit/${profileData._id}`)
    })
    .catch(err => console.log(err));
})

module.exports = app;
