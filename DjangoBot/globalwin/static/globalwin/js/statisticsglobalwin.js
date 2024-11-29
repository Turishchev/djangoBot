const toggleButton = document.getElementById('toggle-menu');
const settingsMenu = document.getElementById('settings-menu');

// Функция для переключения видимости меню
toggleButton.addEventListener('click', () => {
    settingsMenu.classList.toggle('active');
});