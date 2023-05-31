// 'load' event of the window MEANS THE CODE inside the callback function will run when the web page finishes loading.
window.addEventListener('load', () => {

    // create a global variable 
    // This line retrieves the value of the 'todos' key from the browser's localStorage. 
    // It uses JSON.parse() to convert the retrieved data from a string to an array. 
    // If there is no data stored for the 'todos' key, it sets todos to an empty array ([]).
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // calling varibles from the dom
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // They also retrieve the value associated with the 'username' 
    // key from localStorage. If there is no value stored for the 
    // 'username' key, username is set to an empty string
    const username = localStorage.getItem('username') || '';

    // This line sets the value of the nameInput element to the value stored in the username variable
    nameInput.value = username;

    //  When the input value changes, it stores the new value in the 'username' key of localStorage.
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value)
    })

    // This line adds an event listener to the submit event of the newTodoForm element. 
    // It prevents the default form submission behavior, which would cause the page to refresh.
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        // This block of code creates a new todo object with properties for content, category, done, and createdAt. 
        // The values for content and category are retrieved from the respective form elements in newTodoForm. 
        // The done property is initially set to false, and the createdAt property is set to the current timestamp using new Date().getTime().
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // This line adds the todo object to the todos array.
        todos.push(todo);

        // This line converts the todos array to a JSON string using JSON.stringify() 
        // and stores it in the 'todos' key of localStorage. This allows the todos 
        // to persist even if the page is refreshed or closed.
        localStorage.setItem('todos', JSON.stringify(todos));

        // This line resets the form input fields in newTodoForm to their default values.
        e.target.reset()

        // This line calls the DisplayTools() function, which displays the todos on the web page.
        DisplayTools();
    })

    // This line calls the DisplayTools() function when the window finishes loading to display the initial set of todos.
    DisplayTools();
})

// CREATE a function call DisplayTools
function DisplayTools() {

    // this line select the element with the id 'todo-list' 
    const todoList = document.querySelector('#todo-list');

    // This line sets the innerHTML property of the todoList element to an empty string. 
    // By doing this, any previously displayed todo items are removed from the container, 
    // effectively clearing it out. This step ensures that when the DisplayTools() 
    // function is called, the container is empty and ready to display the updated todo items.

    // This line is useful because it prevents duplicating or stacking of todo items each
    // time the DisplayTools() function is called. Instead, it clears the container and prepares it for the fresh display of todo items.
    todoList.innerHTML = '';

    todos.sort((a, b) => b.createdAt - a.createdAt); // Sort todos based on createdAt in descending order

    // This block of code iterates over each todo item in the todos array using the forEach() method. 
    // For each todo item, it creates a new <div> element and adds the CSS class 'todo-item' to it. 
    // This element represents a single todo item.
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        // These lines create new HTML elements using document.createElement(). 
        // The elements created include a <label>, an <input>, a <span>, a <div> 
        // for the todo content, a <div> for actions, an <button> for editing, 
        // and an <button> for deleting. These elements will be used to structure and display the todo item.
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        // This section sets the attributes and classes for the input and span elements. 
        // The input element is assigned a type of 'checkbox' and its checked property is 
        // set based on the done property of the todo item. The span element is given the class 'bubble'.
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        // This conditional statement checks the category property of the todo item. 
        // If the category is 'personal', it adds the 'personal' class to the span element. 
        // Otherwise, it adds the 'business' class. These classes are used for visual styling of the todo item.
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        // These lines add additional classes to the content, actions, edit, and deleteBtn elements. 
        // These classes are used for styling purposes.
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        // These lines set the inner HTML of the content, edit, and deleteBtn elements. 
        // The content element is given an <input> element with its value set to the 
        // content property of the todo item, and the readonly attribute is added to 
        // make it non-editable. The edit and deleteBtn elements are assigned appropriate 
        // text content and also include icons using the <i> element with specific classes.
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML ='Edit <i class="fa-solid fa-pen-to-square"></i>';
        deleteBtn.innerHTML = 'Delete <i class="fa-solid fa-trash"></i>';

        // These lines append the input element and the span element as children to the label element. 
        // The label element is used to wrap the checkbox (input) and the category bubble (span) together. 
        //  By appending these elements to the label, they become its child nodes, and they will be displayed together as part of the todo item.
        label.appendChild(input);
        label.appendChild(span);

        // These lines append the edit button (edit) and the delete button (deleteBtn) 
        // as children to the actions element. The actions element is used to group the buttons together.
        actions.appendChild(edit);
        actions.appendChild(deleteBtn);

        // These lines append the label element, the content element, and the actions element as 
        // children to the todoItem element. The todoItem element represents an individual todo item with its content and actions.
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        // This line appends the todoItem element as a child to the todoList element. 
        // The todoList element represents the container where all the todo items will be displayed.
        todoList.appendChild(todoItem);

        // This condition checks if the done property of the todo item is true. 
        // If it is, the CSS class 'done' is added to the todoItem element, 
        // which applies a visual style indicating that the todo item is completed.
        if (todo.done) {
            todoItem.classList.add('done');
        }

        // It listens for the click event, which occurs when the checkbox is clicked. 
        // When the event is triggered, it updates the done property of the todo item 
        // based on the checked value of the input element. The updated todos array is 
        // then stored in localStorage, and the DisplayTools() function is called to refresh the display of todo items.
        input.addEventListener('click', e => {
            todo.done =e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTools();
    
        })

        // When the button is clicked, it allows the user to edit the todo item's content. 
        // It removes the readonly attribute from the input element, sets focus to the input 
        // for easier editing, and listens for the blur event, which occurs when the input loses 
        // focus. When the input loses focus, the readonly attribute is added back, the content 
        // property of the todo item is updated with the new value, the todos array is stored in localStorage, and the DisplayTools() function is called to refresh the display.
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTools();
            })
        })

        // When the button is clicked, it removes the corresponding todo item from the todos array 
        // using the filter() method. The updated todos array is stored in localStorage, and the 
        // DisplayTools() function is called to refresh the display.
        deleteBtn.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTools();
        })

    })
}