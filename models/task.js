const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 200 },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = { taskSchema, Task };
