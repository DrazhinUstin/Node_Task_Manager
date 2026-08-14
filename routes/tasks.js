const express = require('express');
const { getAllTasks, createTask, getTask, editTask, deleteTask } = require('../controllers/tasks');

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);

router.route('/:taskId').get(getTask).patch(editTask).delete(deleteTask);

module.exports = router;
