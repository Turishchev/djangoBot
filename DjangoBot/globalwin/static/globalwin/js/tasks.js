const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-name');
const taskDetail = document.getElementById('task-detail');

let tasks = [];
let selectedTaskIndex = null;

// Загрузка задач из локального файла
async function loadTasks() {
    const response = await fetch('tasks.json');
    tasks = await response.json();
    renderTasks();
}

// Сохранение задач в локальный файл
async function saveTasks() {
    await fetch('save_tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks),
    });
}

// Отображение списка задач
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.onclick = () => showTaskDetail(index);
        taskList.appendChild(li);
    });
}

// Добавление новой задачи
taskForm.onsubmit = (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, subtasks: [] });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
};

// Отображение подзадач выбранной задачи
function showTaskDetail(index) {
    selectedTaskIndex = index;
    const task = tasks[index];
    taskDetail.innerHTML = `
        <h3>${task.name}</h3>
        <ul>
            ${task.subtasks.map(subtask => `<li>${subtask}</li>`).join('')}
        </ul>
        <form id="subtask-form">
            <input type="text" id="subtask-name" placeholder="Введите подзадачу">
            <button type="submit">Добавить</button>
        </form>
    `;

    document.getElementById('subtask-form').onsubmit = (e) => {
        e.preventDefault();
        const subtaskName = document.getElementById('subtask-name').value.trim();
        if (subtaskName) {
            task.subtasks.push(subtaskName);
            saveTasks();
            showTaskDetail(index);
        }
    };
}

// Инициализация
loadTasks();
