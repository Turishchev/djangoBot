// Получаем элементы
const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-name');
const taskDetail = document.getElementById('task-detail');
const subtaskForm = document.getElementById('subtask-form');
const subtaskInput = document.getElementById('subtask-name');
const subtasksList = document.getElementById('subtasks-list');

// Массив для хранения задач
const tasks = [];
let selectedTaskIndex = null; // Индекс выбранной задачи

// Функция для добавления задачи
function addTask(event) {
	event.preventDefault();

	const taskName = taskInput.value;
	if (taskName) {
		const task = {
			name: taskName,
			subtasks: []  // Массив подзадач для каждой задачи
		};
		tasks.push(task);
		renderTasks();
		taskInput.value = '';  // Очистка поля ввода
	}
}

// Функция для удаления задачи
function deleteTask(index) {
	tasks.splice(index, 1);  // Удаляем задачу из массива
	if (selectedTaskIndex === index) {
		selectedTaskIndex = null; // Если удаляем текущую выбранную задачу
	}
	renderTasks();  // Перерисовываем задачи
	taskDetail.innerHTML = `<p>Выберите задачу, чтобы увидеть подзадачи.</p>`; // Очистка правой колонки
}

// Функция для отображения задач
function renderTasks() {
	taskList.innerHTML = '';  // Очистка списка задач
	tasks.forEach((task, index) => {
		const li = document.createElement('li');
		li.textContent = task.name;

		// Подсветка выбранной задачи
		if (index === selectedTaskIndex) {
			li.classList.add('selected');
		}

		// Кнопка для удаления задачи
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('delete-btn');
		deleteButton.textContent = 'Удалить';
		deleteButton.onclick = () => deleteTask(index); // При клике удаляем задачу

		li.appendChild(deleteButton);
		li.onclick = () => showTaskDetail(index); // При клике на задачу показываем ее подзадачи
		taskList.appendChild(li);
	});
}

// Функция для отображения подзадач выбранной задачи
function showTaskDetail(index) {
	selectedTaskIndex = index; // Устанавливаем выбранную задачу
	const task = tasks[index];
	taskDetail.innerHTML = `<h4>${task.name}</h4>`;

	// Подзадачи
	if (task.subtasks.length > 0) {
		const ul = document.createElement('ul');
		task.subtasks.forEach((subtask, subtaskIndex) => {
			const li = document.createElement('li');
			li.textContent = subtask;

			// Кнопка для удаления подзадачи
			const deleteSubtaskButton = document.createElement('button');
			deleteSubtaskButton.classList.add('delete-btn');
			deleteSubtaskButton.textContent = 'Удалить';
			deleteSubtaskButton.onclick = () => deleteSubtask(index, subtaskIndex);

			li.appendChild(deleteSubtaskButton);
			ul.appendChild(li);
		});
		taskDetail.appendChild(ul);
	} else {
		taskDetail.innerHTML += `<p>Нет подзадач.</p>`;
	}

	// Форма для добавления подзадачи
	subtaskForm.onsubmit = (event) => addSubtask(event, index);
}

// Функция для добавления подзадачи
function addSubtask(event, taskIndex) {
	event.preventDefault();
	const subtaskName = subtaskInput.value;
	if (subtaskName) {
		tasks[taskIndex].subtasks.push(subtaskName);
		showTaskDetail(taskIndex); // Перерисовываем подзадачи
		subtaskInput.value = '';  // Очистка поля ввода
	}
}

// Функция для удаления подзадачи
function deleteSubtask(taskIndex, subtaskIndex) {
	tasks[taskIndex].subtasks.splice(subtaskIndex, 1); // Удаляем подзадачу
	showTaskDetail(taskIndex); // Перерисовываем подзадачи
}

// Добавление события для формы задачи
taskForm.addEventListener('submit', addTask);

// Инициализация отображения задач
renderTasks();
