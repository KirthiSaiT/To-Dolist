function createAndDisplayModal(task, description, cardId = `card-${Date.now()}`) {
    const cardHTML = `
        <div class="col-sm-4 task-card" id="${cardId}">
            <div class="card">
                <div class="card-body d-flex flex-column">
                    <form>
                        <div class="mb-3">
                            <label for="card-task-input-${cardId}" class="form-label">Task</label>
                            <input type="text" class="form-control" id="card-task-input-${cardId}" value="${task}" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="card-description-input-${cardId}" class="form-label">Description</label>
                            <textarea class="form-control" id="card-description-input-${cardId}" rows="2" readonly>${description}</textarea>
                        </div>
                    </form>
                    <div class="mt-auto d-flex justify-content-end">
                        <button class="btn btn-outline-danger me-2 edit-button" data-card-id="${cardId}">
                            <i class="fa-solid fa-file-pen"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger delete-button" data-card-id="${cardId}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('savedData').insertAdjacentHTML('beforeend', cardHTML);
}

// Function to save all tasks to localStorage
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

// Function to load all tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskObj => createAndDisplayModal(taskObj.task, taskObj.description, taskObj.id));
}

        // Add new button click event
        document.getElementById('addNewButton').addEventListener('click', function() {
            const modalElement = document.getElementById('popup');
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        });

        // Save changes button click event
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

        // Reset form when modal is hidden
        document.getElementById('popup').addEventListener('hidden.bs.modal', function () {
            document.getElementById('formContainer').reset();
        });

        // Edit, save, and delete button event delegation
        // Edit, save, and delete button event delegation
document.getElementById('savedData').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('edit-button') || target.classList.contains('save-button') || target.closest('.edit-button') || target.closest('.save-button')) {
        const button = target.closest('.edit-button') || target.closest('.save-button');
        const cardId = button.getAttribute('data-card-id');
        const taskInput = document.getElementById(`card-task-input-${cardId}`);
        const descriptionInput = document.getElementById(`card-description-input-${cardId}`);

        if (button.classList.contains('edit-button')) {
            // Enable editing
            taskInput.removeAttribute('readonly');
            descriptionInput.removeAttribute('readonly');

            // Change the button text to "Commit"
            button.innerHTML = '<i class="fa-solid fa-save"></i> Commit';
            button.classList.remove('edit-button');
            button.classList.add('save-button');
        } else if (button.classList.contains('save-button')) {
            // Save updated values
            const updatedTask = taskInput.value;
            const updatedDescription = descriptionInput.value;

            // Disable editing
            taskInput.setAttribute('readonly', true);
            descriptionInput.setAttribute('readonly', true);

            // Change the button text back to "Edit"
            button.innerHTML = '<i class="fa-solid fa-file-pen"></i> Edit';
            button.classList.remove('save-button');
            button.classList.add('edit-button');

            console.log('Updated Task:', updatedTask);
            console.log('Updated Description:', updatedDescription);

            // Save updated tasks to localStorage
            saveTasksToLocalStorage();
        }
    }

    if (target.classList.contains('delete-button') || target.closest('.delete-button')) {
        const button = target.closest('.delete-button');
        const cardId = button.getAttribute('data-card-id');
        const cardElement = document.getElementById(cardId);
        
        if (cardElement) {
            cardElement.remove();
            // Save updated tasks to localStorage after deletion
            saveTasksToLocalStorage();
        }
    }
});

        // Search functionality
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

        // Optional: Clear search results when input is cleared
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

        // Load tasks when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadTasksFromLocalStorage();
        });