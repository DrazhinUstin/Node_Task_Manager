const express = require('express');
const { getAllTasks, createTask, getTask, editTask, deleteTask } = require('../controllers/tasks');
const verifyUser = require('../middleware/verify-user');

const router = express.Router();

router.use(verifyUser);

router.route('/').get(getAllTasks).post(createTask);

router.route('/:taskId').get(getTask).patch(editTask).delete(deleteTask);

module.exports = router;
