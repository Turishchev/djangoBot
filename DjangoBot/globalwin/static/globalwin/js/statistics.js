document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-menu');
    const settingsMenu = document.getElementById('settings-menu');

    toggleButton.addEventListener('click', () => {
        settingsMenu.classList.toggle('active');
    });
});
