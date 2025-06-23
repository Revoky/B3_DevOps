const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { authenticateToken, authorizeRoles } = require('../middlewares/authHandler');
const { Roles, RoleGroups } = require('../utils/roles')

// router.get('/moderation-panel', authenticateToken, authorizeRoles(RoleGroups.STAFF), protectedController.moderationPanel)

router.get('/', authorizeRoles(RoleGroups.STAFF), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;