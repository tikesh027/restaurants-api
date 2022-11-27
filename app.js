const MONGODB_URI = 'mongodb+srv://tikesh027:tikesh@cluster0.xgb8plp.mongodb.net/?retryWrites=true&w=majority';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const restaurantRoutes = require('./routes/restaurant');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(restaurantRoutes);

mongoose.connect(MONGODB_URI)
    .then(()=>{
        app.listen(3000);
        console.log('Connected');
    }).catch((error) => {
        console.log(error)
    });
