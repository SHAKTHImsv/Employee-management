const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateRegister, validateLogin, handleValidationErrors } = require('../utils/validators');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
