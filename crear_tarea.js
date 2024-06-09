document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-task-form');
    const submitButton = form.querySelector('.submit-button');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
            submitButton.disabled = !allFilled;
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const detail = document.getElementById('task-detail').value;
        const status = document.getElementById('task-status').value;
        
        if (!title || !detail || !status) {
            alert('Todos los campos son requeridos.');
            return;
        }
        
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



