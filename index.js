document.addEventListener('DOMContentLoaded', () => {
    const tasksContainer = document.getElementById('tasks-container');
    let tasks = [];

    function fetchTasks() {
        fetch('https://6664fb85d122c2868e3f89b5.mockapi.io/api/Tareas')
            .then(response => response.json())
            .then(data => {
                tasks = data;
                renderTasks();
            })
            .catch(error => console.error('Error:', error));
    }

    function renderTasks() {
        tasksContainer.innerHTML = tasks
            .sort((a, b) => new Date(b.FechaCreacion) - new Date(a.FechaCreacion))
            .sort((a, b) => (a.Estado === 'Terminada') - (b.Estado === 'Terminada'))
            .map(task => `
                <div class="task-card ${task.Estado === 'Terminada' ? 'completed' : ''}" data-id="${task.id}">
                    <div>
                        <h3 class="task-title">${task.Descripcion}</h3>
                        <p>Creación: ${new Date(task.FechaCreacion).toLocaleString()}</p>
                        ${task.Estado === 'Terminada' ? `<p>Terminación: ${new Date(task.FechaConclusion).toLocaleString()}</p>` : ''}
                        <div class="task-detail">${task.Detalle}</div>
                    </div>
                    <img src="${task.Estado === 'Terminada' ? 'IMG/check.png' : 'IMG/play.png'}" class="play-button" data-id="${task.id}" alt="Play">
                </div>
            `).join('');
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('play-button')) {
                    card.classList.toggle('expanded');
                }
            });
        });

        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.target.getAttribute('data-id');
                const task = tasks.find(t => t.id == id);
                if (task.Estado !== 'Terminada') {
                    playTask(task);
                }
            });
        });
    }

    function playTask(task) {
        const { language, speed } = JSON.parse(localStorage.getItem('audioSettings')) || { language: 'en-US', speed: 1 };
        const utterance = new SpeechSynthesisUtterance(`${task.Descripcion}. ${task.Detalle}`);
        utterance.lang = language;
        utterance.rate = speed;
        window.speechSynthesis.speak(utterance);
    }

    fetchTasks();
});










