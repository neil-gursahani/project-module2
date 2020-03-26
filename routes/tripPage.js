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

//Delete trip
app.get('/trip/delete/:tripId', (request, response) => {
    tripModel
        .findByIdAndDelete(request.params.tripId)
        .then((tripInfo) => {
            response.redirect('/trip');
        })
        .catch((error) => {
            response.send(error);
        });
});

//Update trip
app.post('/trip/:tripId', (request, response) => {
    console.log(request.body);
    debugger
    tripModel
        .findByIdAndUpdate(request.params.tripId, {
            country: request.body.country,
            city: request.body.city,
            date: request.body.date,
            summary: request.body.summary
        })
        .then((tripInfo) => {
            response.redirect(`/trip/${tripInfo._id}`);
        })
        .catch((error) => {
            response.send(error);
        });
});

module.exports = app;