(function() {
    'use strict';

    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const tasksContainer = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    const taskCount = document.getElementById('taskCount');

    // Local Storage Key
    const STORAGE_KEY = 'todos_app_data';

    // Initialize
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Initial render
    render();

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // Add Todo Function
    function addTodo() {
        const text = taskInput.value.trim();
        
        if (!text) {
            taskInput.focus();
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.unshift(todo);
        saveTodos();
        render();
        taskInput.value = '';
        taskInput.focus();
    }

    // Delete Todo Function
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        render();
    }

    // Edit Todo Function
    function editTodo(id) {
        const todo = todos.find(t => t.id === id);
        if (!todo) return;

        const taskItem = document.querySelector(`[data-id="${id}"]`);
        const taskContent = taskItem.querySelector('.task-content');
        const currentText = taskContent.querySelector('.task-text').textContent;

        // Create edit UI
        taskContent.innerHTML = '';
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentText;
        
        taskContent.appendChild(editInput);
        taskItem.classList.add('edit-mode');

        // Focus on input
        editInput.focus();
        editInput.select();

        // Save function
        function saveEdit() {
            const newText = editInput.value.trim();
            
            if (newText) {
                todo.text = newText;
                saveTodos();
            }
            
            taskItem.classList.remove('edit-mode');
            render();
        }

        // Save on Enter
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') {
                taskItem.classList.remove('edit-mode');
                render();
            }
        });

        // Save on blur
        editInput.addEventListener('blur', saveEdit);
    }

    // Toggle Todo Complete
    function toggleComplete(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos();
            render();
        }
    }

    // Render Function
    function render() {
        // Update task count
        taskCount.textContent = todos.length;

        // Clear container
        tasksContainer.innerHTML = '';

        // Show/hide empty state
        if (todos.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        } else {
            emptyState.classList.add('hidden');
        }

        // Render tasks
        todos.forEach(todo => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.setAttribute('data-id', todo.id);

            taskItem.innerHTML = `
                <div class="task-content">
                    <div class="task-text ${todo.completed ? 'completed' : ''}">
                        ${escapeHtml(todo.text)}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" title="Edit task">✎ Edit</button>
                    <button class="task-btn delete-btn" title="Delete task">🗑 Delete</button>
                </div>
            `;

            // Add event listeners
            const editBtn = taskItem.querySelector('.edit-btn');
            const deleteBtn = taskItem.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => editTodo(todo.id));
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

            // Toggle complete on text click
            const taskText = taskItem.querySelector('.task-text');
            taskText.style.cursor = 'pointer';
            taskText.addEventListener('click', () => toggleComplete(todo.id));

            tasksContainer.appendChild(taskItem);
        });
    }

    // Save to LocalStorage
    function saveTodos() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();