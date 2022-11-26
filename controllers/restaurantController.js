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

exports.getCategoriesList = (req, res, next) => {
    Restaurant.find().distinct('category').then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Some error occured while fetching the Restaurant.');
    });
}

exports.getRestaurantByCategory = (req, res, next) => {
    const categoryName = req.params.categoryName;
    Restaurant.find({ category: categoryName }).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Some error occured while fetching the Restaurant.');
    });
}

exports.getRestaurantById = (req, res, next) => {
    const restaurantId = req.params.id;
    Restaurant.findById(restaurantId).then((result) => {
        if(!result){
            const responseBody = {
                message: 'No Restaurant found with the given id'
            }
            res.status(404).send(responseBody);
            return;
        }
        res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Some error occured while fetching the Restaurant.');
    });
}

exports.getRestaurantByRating = (req, res, next) => {
    const rating = req.params.ratingValue;
    Restaurant.find({ rating: { $gte: rating } }).then((result) => {
        res.status(404).send(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Some error occured while fetching the Restaurant.');
    });
}