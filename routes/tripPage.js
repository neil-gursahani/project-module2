const express = require('express');
const app = express();
const tripModel = require('../models/Trip');
const multer  = require('multer');
const upload = multer({ dest: 'public/fileUploads'});

// Render the trip page
// app.get('/trip', (request, response) => {
//     response.render('pages/tripPage');
// });

//Get information from the form
app.post('/trip', upload.single('file'), (request, response) => {
    tripModel
        .create({
            country: request.body.country,
            city: request.body.city,
            date: request.body.date,
            file: request.file.filename,
            summary: request.body.summary,
        })
        .then((tripInfo) => {
            response.redirect('/trip');
        })
        .catch((error) => {
            response.send(error);
        });
});

//Adds the trips to the trip page
app.get('/trip', (request, response) => {
    tripModel
        .find()
        .then((tripInfo) => {
            response.render('pages/tripPage', {tripHbs: tripInfo});
        })
        .catch((error) => {
            response.send(error);
        });
});

//Render the country detail page
app.get('/trip/:tripId', (request, response) => {
    tripModel
        .findById(request.params.tripId)
        .then((tripInfo) => {
            response.render('pages/tripDetailPage', {tripHbs: tripInfo});
        })
        .catch((error) => {
            response.send(error);
        });
});

module.exports = app;