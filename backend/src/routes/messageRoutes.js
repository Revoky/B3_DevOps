const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/matches/:match_id/messages', messageController.getAllMessages);

router.post('/matches/:match_id/messages', messageController.createMessage);

router.get('/matches/:match_id/messages/:id', messageController.getMessageById);

router.delete('/matches/:match_id/messages/:id', messageController.deleteMessage);

module.exports = router;
