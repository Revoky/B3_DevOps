const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { authenticateToken, authorizeRoles } = require('../middlewares/authHandler');
const { Roles, RoleGroups } = require('../utils/roles')

router.get('/checkToken', authenticateToken, authorizeRoles(Roles.GUEST), authController.checkToken);
router.post('/refresh', authController.refreshToken);

module.exports = router;
