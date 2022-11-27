const Restaurant = require('../models/restaurant');

exports.addRestaurant = (req, res, next) => {
    const { name, description, category, imageURL, location, phone, rating } = req.body;
    if(Object.keys(req.body).length === 0){
        res.status(500).json({
            message: 'Content cannot be empty'
        });
        return;
    }
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
        res.status(200).json(result);
    }).catch((error) => {
        res.status(500).json(error.message);
    });
}

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find().then((result) => {
        const responseBody = {
            restaurants: result,
            message: 'Restaurants fetched successfully.'
        }
        res.status(200).json(responseBody);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while fetching the Restaurants');
    });
}

exports.getCategoriesList = (req, res, next) => {
    Restaurant.find().distinct('category').then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while fetching the Restaurant.');
    });
}

exports.getRestaurantByCategory = (req, res, next) => {
    const categoryName = req.params.categoryName;
    Restaurant.find({ category: categoryName }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occurred while fetching Categories');
    });
}

exports.getRestaurantById = (req, res, next) => {
    const restaurantId = req.params.id;
    Restaurant.findById(restaurantId).then((result) => {
        if(!result){
            const responseBody = {
                message: 'No Restaurant found with the given id'
            }
            res.status(404).json(responseBody);
            return;
        }
        res.status(200).json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while fetching the Restaurant.');
    });
}

exports.getRestaurantByRating = (req, res, next) => {
    const rating = req.params.ratingValue;
    Restaurant.find({ rating: { $gte: rating } }).then((result) => {
        res.status(404).json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while fetching the Restaurant.');
    });
}

exports.updateRestaurantById = (req, res, next) => {
    const restaurantId = req.params.id;
    if(!Object.keys(req.body).length){
        const responseBody = {
            message: 'Restaurant Data is required'
        }
        res.status(400).json(responseBody);
        return;
    }
    const { name, description, category, imageURL, location, phone, rating } = req.body;
    console.log(req.body);

    Restaurant.updateOne(
        { _id: restaurantId },
        { name, description, category, imageURL, location, phone, rating }
    ).then((result) => {
        if(result.matchedCount === 0){
            const responseBody = {
                message: 'No Restaurant found for given ID'
            }
            res.status(200).json(responseBody);
            return;
        }
        if(!result.acknowledged){
            res.status(500).json('Some error occured while fetching the Restaurant');
            return;
        }
        const responseBody = {
            message: "Restaurant updated successfully."
        }
        res.status(200).json(responseBody);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while fetching the Restaurant.');
    });
}

exports.deleteRestaurantById = (req, res, next) => {
    const restaurantId = req.params.id;
    Restaurant.findByIdAndDelete(restaurantId).then((result)=>{
        const responseBody = {
            restaurant: result,
            message: 'Restaurant deleted successfully',
        };
        res.status(200).json(responseBody);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while deleting the Restaurant');
    });
}

exports.deleteAllRestaurants = (req, res, next) => {
    Restaurant.deleteMany().all().then((result) => {
        const responseBody = {
            restaurant: result,
            message: 'Restaurants deleted successfully',
        };
        if(!result.acknowledged){
            res.status(500).json('Some error occured while deleting the Restaurants');
            return;
        }
        res.status(200).json(responseBody);
    }).catch((error) => {
        console.log(error);
        res.status(500).json('Some error occured while deleting the Restaurants');
    });
}