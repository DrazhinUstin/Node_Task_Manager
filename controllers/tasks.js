const { Task } = require('../models/task');
const CustomError = require('../lib/custom-error');

async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({}).sort('-createdAt');
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
}

async function getTask(req, res, next) {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      throw new CustomError('Task Not Found!', 404);
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const createdTask = await Task.create(req.body);
    res.status(200).json({ success: true, data: createdTask });
  } catch (error) {
    next(error);
  }
}

async function editTask(req, res, next) {
  try {
    const { taskId } = req.params;

    const editedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!editedTask) {
      throw new CustomError('Task Not Found!', 404);
    }

    res.status(200).json({ success: true, data: editedTask });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new CustomError('Task Not Found!', 404);
    }

    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTasks, getTask, createTask, editTask, deleteTask };
