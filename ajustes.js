document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const language = document.getElementById('audio-language').value;
        const speed = document.getElementById('audio-speed').value;
        localStorage.setItem('audioSettings', JSON.stringify({language, speed}));
        alert('ajustes guardados correctamente');
    });

    const savedSettings = JSON.parse(localStorage.getItem('audioSettings'));
    if (savedSettings) {
        document.getElementById('audio-language').value = savedSettings.language;
        document.getElementById('audio-speed').value = savedSettings.speed;
    }
});
