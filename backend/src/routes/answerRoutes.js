const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.post('/users/:user_id/answers', answerController.createUserAnswer);
router.get('/question/:question_id', answerController.getUserAnswerByQuestion);
router.put('/:answer_id', answerController.updateUserAnswer);

module.exports = router;