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
                <div class="task-card ${task.Estado === 'Terminada' ? 'completed' : ''}">
                    <div>
                        <h3>${task.Descripcion}</h3>
                        <p>${new Date(task.FechaCreacion).toLocaleString()}</p>
                        ${task.Estado === 'Terminada' ? `<p>Terminación: ${new Date(task.FechaConclusion).toLocaleString()}</p>` : ''}
                        <label>Status: 
                            <select data-id="${task.id}">
                                <option value="Creada" ${task.Estado === 'Creada' ? 'selected' : ''}>Creada</option>
                                <option value="Iniciada" ${task.Estado === 'Iniciada' ? 'selected' : ''}>Iniciada</option>
                                <option value="Terminada" ${task.Estado === 'Terminada' ? 'selected' : ''}>Terminada</option>
                            </select>
                        </label>
                    </div>
                </div>
            `).join('');

        tasksContainer.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const status = e.target.value;
                updateTaskStatus(id, status);
            });
        });
    }

    function updateTaskStatus(id, status) {
        const task = tasks.find(t => t.id == id);
        task.Estado = status;
        if (status === 'Terminada') {
            task.FechaConclusion = new Date().toISOString();
        }

        fetch(`https://6664fb85d122c2868e3f89b5.mockapi.io/api/Tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            tasks = tasks.map(t => t.id == id ? data : t);
            renderTasks();
        })
        .catch(error => console.error('Error:', error));
    }

    fetchTasks();
});

