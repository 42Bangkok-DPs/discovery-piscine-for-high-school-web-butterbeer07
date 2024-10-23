// Function to get cookies
function getCookies() {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    return cookies;
}

// Function to set cookies
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to load to-dos from cookies
function loadTodos() {
    const todos = getCookies()['todos'];
    if (todos) {
        const todoArray = JSON.parse(todos);
        todoArray.forEach(todo => addTodoToDOM(todo));
    }
}

// Function to add a to-do item to the DOM
function addTodoToDOM(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.textContent = todo;
    todoItem.onclick = function() {
        const confirmDelete = confirm('Do you want to remove this TO DO?');
        if (confirmDelete) {
            todoItem.remove();
            saveTodos(); // Update cookie after deletion
        }
    };
    const ftList = document.getElementById('ft_list');
    ftList.insertBefore(todoItem, ftList.firstChild); // Add to the top of the list
}

// Function to save todos to cookies
function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map(item => item.textContent);
    setCookie('todos', JSON.stringify(todos), 7); // Save for 7 days
}

// Load existing to-dos when the page loads
window.onload = loadTodos;

// Event listener for the "New" button
document.getElementById('newButton').addEventListener('click', function() {
    const newTodo = prompt('Enter a new TO DO:');
    if (newTodo && newTodo.trim() !== '') {
        addTodoToDOM(newTodo);
        saveTodos(); // Save the new list to cookies
    }
});
