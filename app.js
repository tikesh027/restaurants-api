const MONGODB_URI = 'mongodb+srv://tikesh027:tikesh@cluster0.xgb8plp.mongodb.net/?retryWrites=true&w=majority';

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(MONGODB_URI)
    .then(()=>{
        app.listen(3000);
        console.log('Connected');
    }).catch((error) => {
        console.log(error)
    });
