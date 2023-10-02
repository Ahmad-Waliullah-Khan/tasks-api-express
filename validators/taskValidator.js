const { body, param } = require('express-validator');

// Validation rules for creating a task
exports.validateTaskCreation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['open', 'inprogress', 'completed'])
    .withMessage('Invalid status value. Following status values are accepted: open, inprogress, competed'),
];

// Validation rules for updating a task
exports.validateTaskUpdate = [
    param('id').isInt().withMessage('Invalid task ID'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['open', 'inprogress', 'completed'])
    .withMessage('Invalid status value. Following status values are accepted: open, inprogress, competed'),
];