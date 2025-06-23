const express = require('express');
const router = express.Router();
const preferenceController = require('../controllers/preferenceController');

router.get('/', preferenceController.getAllPreferences);
router.get('/:id', preferenceController.getPreferenceByUserId);
router.put('/:id', preferenceController.updatePreference);
router.post('/:id', preferenceController.createPreference);

module.exports = router;
