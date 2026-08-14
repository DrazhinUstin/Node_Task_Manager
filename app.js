require('dotenv').config();
const express = require('express');
const tasks = require('./routes/tasks');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(errorHandler);

start();

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log('DB connected successfully!');

    app.listen(3000, () => {
      console.log(`Task manager app listening on port 3000`);
    });
  } catch (error) {
    console.error(error);
  }
}
