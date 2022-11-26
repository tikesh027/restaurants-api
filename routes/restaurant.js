const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.post('/api/restaurant/add', restaurantController.addRestaurant);

module.exports = router;