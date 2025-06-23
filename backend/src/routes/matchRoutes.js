const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { authenticateToken } = require('../middlewares/authHandler');

router.post('/match', matchController.createMatch);

router.get('/matches', authenticateToken, matchController.getAllMatches);

router.get('/match/:match_id', authenticateToken, matchController.getMatchById);

router.delete('/match/:match_id', matchController.deleteMatch);

module.exports = router;
