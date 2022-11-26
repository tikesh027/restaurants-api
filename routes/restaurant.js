const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/api/restaurant/add', restaurantController.addRestaurant);
router.get('/api/restaurant/', restaurantController.getAllRestaurants);
router.get('/api/restaurant/categories', restaurantController.getCategoriesList);
router.get('/api/restaurant/categories/:categoryName', restaurantController.getRestaurantByCategory);
router.get('/api/restaurant/:id',restaurantController.getRestaurantById);
router.get('/api/restaurant/rating/:ratingValue', restaurantController.getRestaurantByRating);
router.put('/api/restaurant/:id', restaurantController.updateRestaurantById);
router.delete('/api/restaurant/:id', restaurantController.deleteRestaurantById);
router.delete('/api/restaurant/', restaurantController.deleteAllRestaurants);



module.exports = router;