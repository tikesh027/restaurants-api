const MONGODB_URI = 'mongodb+srv://tikesh027:tikesh@cluster0.xgb8plp.mongodb.net/?retryWrites=true&w=majority';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const restaurantRoutes = require('./routes/restaurant');

const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));
app.use(restaurantRoutes);

mongoose.connect(MONGODB_URI)
    .then(()=>{
        app.listen(3000);
        console.log('Connected');
    }).catch((error) => {
        console.log(error)
    });
