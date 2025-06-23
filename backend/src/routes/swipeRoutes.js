const express = require('express');
const router = express.Router();
const swipeController = require('../controllers/swipeController');
const { authenticateToken } = require('../middlewares/authHandler');

router.get('/', swipeController.getAllSwipes);

router.get('/:user_id', swipeController.getSwipeByUserId);

router.post('/', authenticateToken, swipeController.createSwipe);

module.exports = router;
