const tasksDOM = document.querySelector('.task-list');
const taskForm = document.querySelector('.task-form');
const taskFormInput = taskForm.querySelector('input');
const taskFormButton = taskForm.querySelector('button');
const taskFormAlert = taskForm.nextElementSibling;

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  taskFormAlert.textContent = '';
  taskFormButton.disabled = true;
  try {
    await axios.post('/api/v1/tasks', { name: taskFormInput.value });
    taskFormInput.value = '';
    displayTasks();
  } catch (error) {
    console.error(error);
    taskFormAlert.textContent = `Failed to add task. The error message is: ${error.response.data.message}`;
  }
  taskFormButton.disabled = false;
});

tasksDOM.addEventListener('click', async (e) => {
  const target = e.target.closest('.task-delete-btn');
  if (!target) return;
  target.disabled = true;
  const taskId = target.parentElement.dataset.id;
  try {
    await axios.delete(`/api/v1/tasks/${taskId}`);
    displayTasks();
  } catch (error) {
    console.error(error);
    target.disabled = false;
  }
});

displayTasks();

async function displayTasks() {
  tasksDOM.innerHTML = '<span class="spinner">Loading tasks...</span>';
  try {
    const response = await axios.get('/api/v1/tasks');
    tasksDOM.innerHTML = response.data.data
      .map(
        ({ _id, name, completed }) => `<li class="task" data-id="${_id}">
          <p class="${completed ? 'completed' : ''}">${name}</p>
          <a href="task.html?id=${_id}">edit</a>
          <button class="task-delete-btn">delete</button>
        </li>`,
      )
      .join('');
  } catch (error) {
    console.error(error);
    tasksDOM.innerHTML = `<p>Failed to load tasks. The error message is: ${error.response.data.message}</p>`;
  }
}
