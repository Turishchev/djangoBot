document.addEventListener('DOMContentLoaded', () => {
    const statisticsButton = document.getElementById('statistics-btn');
    const contentArea = document.querySelector('.content');

    // Функция для загрузки страницы статистики в правую панель
    statisticsButton.addEventListener('click', () => {
        fetch('/statistics')  // путь к странице статистики
            .then(response => response.text())
            .then(data => {
                // Вставляем содержимое страницы статистики в правую панель
                contentArea.innerHTML = data;
            })
            .catch(error => console.error('Error loading statistics:', error));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statisticsButton = document.getElementById('tasks-btn');
    const contentArea = document.querySelector('.content');

    // Функция для загрузки страницы статистики в правую панель
    statisticsButton.addEventListener('click', () => {
        fetch('/tasks')  // путь к странице статистики
            .then(response => response.text())
            .then(data => {
                // Вставляем содержимое страницы статистики в правую панель
                contentArea.innerHTML = data;
            })
            .catch(error => console.error('Error loading statistics:', error));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statisticsButton = document.getElementById('settings-btn');
    const contentArea = document.querySelector('.content');

    // Функция для загрузки страницы статистики в правую панель
    statisticsButton.addEventListener('click', () => {
        fetch('/settings')  // путь к странице статистики
            .then(response => response.text())
            .then(data => {
                // Вставляем содержимое страницы статистики в правую панель
                contentArea.innerHTML = data;
            })
            .catch(error => console.error('Error loading statistics:', error));
    });
});
