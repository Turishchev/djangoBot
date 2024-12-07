const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-name');
const taskDetail = document.getElementById('task-detail');

let tasks = [];
let selectedTaskIndex = null;

// Загрузка задач из локального файла
async function loadTasks() {
    const response = await fetch('/tasks.json');
    tasks = await response.json();
    renderTasks();
}

// Сохранение задач в локальный файл
async function saveTasks() {
    await fetch('/save_tasks', {
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
        li.classList.add('task-item');
        li.textContent = task.name;
        li.onclick = () => showTaskDetail(index);

        // Кнопка для удаления задачи
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); // предотвращаем вызов onclick задачи
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
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

// Удаление задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Отображение подзадач выбранной задачи
function showTaskDetail(index) {
    selectedTaskIndex = index;
    const task = tasks[index];
    taskDetail.innerHTML = `
        <h3>${task.name}</h3>
        <ul class="subtask-list">
            ${task.subtasks.map((subtask, subtaskIndex) => `
                <li class="subtask-item">
                    ${subtask}
                    <button class="delete-btn" onclick="deleteSubtask(${index}, ${subtaskIndex})">❌</button>
                </li>
            `).join('')}
        </ul>
        <form id="subtask-form">
            <input type="text" id="subtask-name" placeholder="Введите подзадачу">
            <button type="submit" class="btn">Добавить подзадачу</button>
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

// Удаление подзадачи
function deleteSubtask(taskIndex, subtaskIndex) {
    tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    saveTasks();
    showTaskDetail(taskIndex);
}

// Инициализация
loadTasks();
