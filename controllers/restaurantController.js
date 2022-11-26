const Restaurant = require('../models/restaurant');

exports.addRestaurant = (req, res, next) => {
    const { name, description, category, imageURL, location, phone, rating } = req.body;
    const restaurant = new Restaurant({
        category,
        description,
        imageURL,
        location,
        name,
        phone,
        rating
    });
    restaurant.save().then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
}

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find().then((result) => {
        const responseBody = {
            restaurants: result,
            message: 'Restaurants fetched successfully.'
        }
        console.log(responseBody);
        res.status(200).send(responseBody);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
}