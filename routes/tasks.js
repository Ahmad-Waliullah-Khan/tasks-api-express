const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const taskValidator = require('../validators/taskValidator');

router.post('/', taskValidator.validateTaskCreation, taskController.createTask);
router.put('/:id', taskValidator.validateTaskUpdate, taskController.updateTask);
router.get('/', taskController.getAllTasks);
router.get('/metrics', taskController.getTaskMetrics);

module.exports = router;