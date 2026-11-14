import api from './api.js';

const token = localStorage.getItem('token');

if (!token) {
  window.location.replace('login.html');
}

const searchParams = new URLSearchParams(window.location.search);
const taskId = searchParams.get('id');
const taskFormDOM = document.querySelector('.task-form');
const taskFormInput = taskFormDOM.querySelector('input[type="text"]');
const taskFormCheckbox = taskFormDOM.querySelector('input[type="checkbox"]');
const taskFormButton = taskFormDOM.querySelector('button');
const taskFormError = taskFormDOM.nextElementSibling;

taskFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  taskFormError.textContent = '';
  taskFormButton.disabled = true;
  try {
    await api.patch(`/tasks/${taskId}`, {
      name: taskFormInput.value,
      completed: taskFormCheckbox.checked,
    });
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    taskFormError.textContent = `Failed to edit a task. The error message is: ${error.response.data.message}`;
  }
  taskFormButton.disabled = false;
});

displayTask();

async function displayTask() {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    const { name, completed } = response.data.data;
    taskFormInput.value = name;
    taskFormCheckbox.checked = completed;
  } catch (error) {
    console.error(error);
    taskFormError.textContent = `Failed to load task. The error message is: ${error.response.data.message}`;
  }
}
