const Task = require('../models/task');
const { validationResult } = require('express-validator');

exports.createTask = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Could not create the task' });
    }
};

exports.updateTask = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Could not update the task' });
    }
};

exports.getAllTasks = async(req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const offset = (page - 1) * pageSize;

        const tasks = await Task.findAll({
            offset,
            limit: pageSize,
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve tasks' });
    }
};

exports.getTaskById = async(req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve the task' });
    }
};

exports.getTaskMetrics = async(req, res) => {
    try {
        const { type = 'status' } = req.query;
        const metrics = [];

        if (type === 'status') {
            // Calculate metrics based on status
            const open_tasks = await Task.count({ where: { status: 'open' } });
            const inprogress_tasks = await Task.count({ where: { status: 'inprogress' } });
            const completed_tasks = await Task.count({ where: { status: 'completed' } });

            res.json({ open_tasks, inprogress_tasks, completed_tasks });
        } else if (type === 'timeline') {
            // Calculate metrics based on timeline
            const tasks = await Task.findAll({ attributes: ['createdAt', 'status'] });
            const groupedMetrics = {};

            tasks.forEach((task) => {
                const monthYear = task.createdAt.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                });

                if (!groupedMetrics[monthYear]) {
                    groupedMetrics[monthYear] = {
                        open_tasks: 0,
                        inprogress_tasks: 0,
                        completed_tasks: 0,
                    };
                }

                groupedMetrics[monthYear][task.status + '_tasks'] += 1;
            });

            // Convert grouped metrics to the desired structure
            Object.keys(groupedMetrics).forEach((monthYear) => {
                metrics.push({
                    date: monthYear,
                    metrics: groupedMetrics[monthYear],
                });
            });

            res.json(metrics);
        } else {
            return res.status(400).json({ error: 'Invalid type parameter. Use "status" or "timeline".' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve task metrics' });
    }
};