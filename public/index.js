import api from './api.js';

const token = localStorage.getItem('token');

if (!token) {
  window.location.replace('login.html');
}

const tasksDOM = document.querySelector('.task-list');
const taskForm = document.querySelector('.task-form');
const taskFormInput = taskForm.querySelector('input');
const taskFormButton = taskForm.querySelector('button');
const taskFormError = taskForm.nextElementSibling;

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  taskFormError.textContent = '';
  taskFormButton.disabled = true;
  try {
    await api.post('/tasks', { name: taskFormInput.value });
    taskFormInput.value = '';
    displayTasks();
  } catch (error) {
    console.error(error);
    taskFormError.textContent = `Failed to add task. The error message is: ${error.response.data.message}`;
  }
  taskFormButton.disabled = false;
});

tasksDOM.addEventListener('click', async (e) => {
  const target = e.target.closest('.task-delete-btn');
  if (!target) return;
  target.disabled = true;
  const taskId = target.parentElement.dataset.id;
  try {
    await api.delete(`/tasks/${taskId}`);
    displayTasks();
  } catch (error) {
    console.error(error);
    target.disabled = false;
  }
});

displayTasks();

async function displayTasks() {
  tasksDOM.innerHTML = '<span class="spinner"></span>';
  try {
    const response = await api.get('/tasks');
    tasksDOM.innerHTML = response.data.data
      .map(
        ({ _id, name, completed }) => `<li class="task" data-id="${_id}">
          <p class="${completed ? 'completed' : ''}">${name}</p>
          <a href="task.html?id=${_id}" class="btn-icon">
            <i class="fa-solid fa-pen-to-square"></i>
          </a>
          <button class="btn-icon-destructive task-delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </li>`,
      )
      .join('');
  } catch (error) {
    console.error(error);
    tasksDOM.innerHTML = `<p class="text-center">Failed to load tasks. The error message is: ${error.response.data.message}</p>`;
  }
}
