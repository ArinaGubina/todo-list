'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerIinput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let local = JSON.parse( localStorage.getItem('todoData') );
const todoData = local === null? [] : local;
console.log(local);

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach( function(item, key) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoComplete = li.querySelector('.todo-complete');
        todoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(){
            li.remove();
            todoData.splice(key, 1);
            render();
        });
    });

    // Преобразуем в строку JSON с помощью метода JSON.stringify(),
    // затем сохраняем в localStorage под именем todoData
    localStorage.setItem('todoData', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerIinput.value === '') {
        return;
    }
    const newTodo = {
        value: headerIinput.value,
        completed: false
    };

    todoData.push(newTodo);
    console.log(todoData);
    render();
    headerIinput.value = '';
});

render();
