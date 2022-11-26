const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/api/restaurant/add', restaurantController.addRestaurant);
router.get('/api/restaurant/', restaurantController.getAllRestaurants);
router.get('/api/restaurant/categories', restaurantController.getCategoriesList);
router.get('/api/restaurant/categories/:categoryName', restaurantController.getRestaurantByCategory);



module.exports = router;