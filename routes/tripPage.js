const express = require('express');
const app = express();
const tripModel = require('../models/Trip');
const multer  = require('multer');
const upload = multer({ dest: 'public/fileUploads'});
const moment = require('moment');

//Get information from the form
app.post('/trip', upload.single('file'), (request, response) => {
    const formatted_date = moment(request.body.date).format('DD-MM-YYYY');
    tripModel
        .create({
            country: request.body.country,
            city: request.body.city,
            date: formatted_date,
            file: request.file.filename,
            summary: request.body.summary,
            rating: request.body.rating
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
    // console.log(request.body.date);
    // let a = new Date(request.body.date);
    // let formatted_date = `${a.getFullYear()}-${a.getMonth()}-${a.getDate()}`;

    tripModel
        .findByIdAndUpdate(request.params.tripId, {
            country: request.body.country,
            city: request.body.city,
            date: request.body.date,
            summary: request.body.summary,
            friends: request.body.friends,
            food: request.body.food,
            landmarks: request.body.landmarks,
            rating: request.body.rating

        })
        .then((tripInfo) => {
            response.redirect(`/trip/${tripInfo._id}`);
        })
        .catch((error) => {
            response.send(error);
        });
});

module.exports = app;