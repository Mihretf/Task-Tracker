let tasks = [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ description: text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  // Sort: uncompleted first
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    const desc = document.createElement('span');
    desc.className = 'description';
    desc.textContent = task.description;

    const buttons = document.createElement('div');
    buttons.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete';
    completeBtn.textContent = task.completed ? 'Unmark' : 'Complete';
    completeBtn.onclick = () => {
      const actualIndex = tasks.findIndex(t => t.description === task.description && t.completed === task.completed);
      toggleComplete(actualIndex);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      const actualIndex = tasks.findIndex(t => t.description === task.description && t.completed === task.completed);
      deleteTask(actualIndex);
    };

    buttons.appendChild(completeBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(desc);
    li.appendChild(buttons);

    taskList.appendChild(li);
  });
}
