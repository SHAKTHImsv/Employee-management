const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { validateTask, handleValidationErrors } = require('../utils/validators');

const router = express.Router();

// All task routes require authentication
router.use(auth);

router.get('/', taskController.getTasks);
router.get('/stats', taskController.getTaskStats);
router.get('/:id', taskController.getTask);
router.post('/', validateTask, handleValidationErrors, taskController.createTask);
router.put('/:id', validateTask, handleValidationErrors, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
