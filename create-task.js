document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-task-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const detail = document.getElementById('task-detail').value;
        const status = document.getElementById('task-status').value;
        const task = {
            Descripcion: title,
            Detalle: detail,
            Estado: status,
            FechaCreacion: new Date().toISOString()
        };
        saveTask(task);
    });

    function saveTask(task) {
        fetch('https://6664fb85d122c2868e3f89b5.mockapi.io/api/Tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            alert('Tarea creada correctamente !');
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error:', error));
    }
});
