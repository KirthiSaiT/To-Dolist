function createAndDisplayModal(task, description, cardId = `card-${Date.now()}`) {
    const cardHTML = `
        <div class="col-sm-4 task-card" id="${cardId}" style="animation: fadeIn 0.5s;">
            <div class="card h-100 border-primary">
                <div class="card-header bg-primary text-white">
                    Task Details
                </div>
                <div class="card-body d-flex flex-column">
                    <form>
                        <div class="mb-3">
                            <label for="card-task-input-${cardId}" class="form-label">Task</label>
                            <input type="text" class="form-control border-primary" id="card-task-input-${cardId}" value="${task}" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="card-description-input-${cardId}" class="form-label">Description</label>
                            <textarea class="form-control border-primary" id="card-description-input-${cardId}" rows="2" readonly>${description}</textarea>
                        </div>
                    </form>
                    <div class="mt-auto d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-warning me-2 edit-button" data-card-id="${cardId}">
                            <i class="fa-solid fa-file-pen"></i> Edit
                        </button>
                        <button type="button" class="btn btn-outline-danger delete-button" data-card-id="${cardId}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('savedData').insertAdjacentHTML('beforeend', cardHTML);
}




function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-card').forEach(card => {
        const cardId = card.id;
        const taskInput = card.querySelector('input').value;
        const descriptionInput = card.querySelector('textarea').value;
        tasks.push({ id: cardId, task: taskInput, description: descriptionInput });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskObj => createAndDisplayModal(taskObj.task, taskObj.description, taskObj.id));
}


        document.getElementById('addNewButton').addEventListener('click', function() {
            const modalElement = document.getElementById('popup');
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        });

        
        document.getElementById('save-changes').addEventListener('click', function() {
            const task = document.getElementById('task-input').value;
            const description = document.getElementById('textarea-input').value;

            if (task.trim() === '' || description.trim() === '') {
                alert('Both task and description are required!');
                return;
            }

            const modalElement = document.getElementById('popup');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();

            createAndDisplayModal(task, description);
            saveTasksToLocalStorage();
        });

        
        document.getElementById('popup').addEventListener('hidden.bs.modal', function () {
            document.getElementById('formContainer').reset();
        });

    
document.getElementById('savedData').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button') || target.classList.contains('save-button') || target.closest('.edit-button') || target.closest('.save-button')) {
        const button = target.closest('.edit-button') || target.closest('.save-button');
        const cardId = button.getAttribute('data-card-id');
        const taskInput = document.getElementById(`card-task-input-${cardId}`);
        const descriptionInput = document.getElementById(`card-description-input-${cardId}`);

        if (button.classList.contains('edit-button')) {
            
            taskInput.removeAttribute('readonly');
            descriptionInput.removeAttribute('readonly');

            
            button.innerHTML = '<i class="fa-solid fa-save"></i> Commit';
            button.classList.remove('edit-button');
            button.classList.add('save-button');
        } else if (button.classList.contains('save-button')) {
            
            const updatedTask = taskInput.value;
            const updatedDescription = descriptionInput.value;

            
            taskInput.setAttribute('readonly', true);
            descriptionInput.setAttribute('readonly', true);

           
            button.innerHTML = '<i class="fa-solid fa-file-pen"></i> Edit';
            button.classList.remove('save-button');
            button.classList.add('edit-button');

            console.log('Updated Task:', updatedTask);
            console.log('Updated Description:', updatedDescription);

            
            saveTasksToLocalStorage();
        }
    }

    if (target.classList.contains('delete-button') || target.closest('.delete-button')) {
        const button = target.closest('.delete-button');
        const cardId = button.getAttribute('data-card-id');
        const cardElement = document.getElementById(cardId);
        
        if (cardElement) {
            cardElement.remove();
            
            saveTasksToLocalStorage();
        }
    }
});

        
        document.getElementById('search-button').addEventListener('click', function() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const taskCards = document.querySelectorAll('.task-card');

            taskCards.forEach(card => {
                const taskText = card.querySelector('input').value.toLowerCase();
                const descriptionText = card.querySelector('textarea').value.toLowerCase();
                if (taskText.includes(searchTerm) || descriptionText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        
        document.getElementById('search-input').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const taskCards = document.querySelectorAll('.task-card');

            taskCards.forEach(card => {
                const taskText = card.querySelector('input').value.toLowerCase();
                const descriptionText = card.querySelector('textarea').value.toLowerCase();
                if (taskText.includes(searchTerm) || descriptionText.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

      
        document.addEventListener('DOMContentLoaded', function() {
            loadTasksFromLocalStorage();
        });