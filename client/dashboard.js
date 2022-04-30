const fetchTodos = async (userId) => {
  try {
    const res = await fetch(`/todos/${userId}`);
    const todos = await res.json();
    return todos;
  } catch (err) {
    (err) => console.log(err);
  }
};

const createDeleteBtn = (todoId) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.addEventListener('click', async () => {
    const res = await fetch(`/todos/${todoId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
      location.reload();
    }
  });
  return deleteBtn;
};

const updateStatus = async (todoId, didComplete, task) => {
  const res = await fetch('/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todoId,
      done: didComplete,
      task,
    }),
  });
  if (res.status === 200) {
    location.reload();
  }
};

let todos;
document.addEventListener('DOMContentLoaded', async () => {
  const userId = localStorage.getItem('userId');
  todos = await fetchTodos(userId);

  // create a container;
  const body = document.querySelector('body');
  const container = document.createElement('div');
  container.setAttribute('id', 'todoContainer');

  const todoList = document.createElement('ul');
  todoList.setAttribute('id', 'todoList');

  if (todos?.length > 0) {
    todos.map((todo) => {
      const todoItemContainer = document.createElement('div');
      todoItemContainer.classList.add('todoItemContainer');
      const todoItem = document.createElement('li');
      todoItem.classList.add('todoItem');
      todoItem.innerHTML = todo.task;
      todoItemContainer.appendChild(todoItem);
      todoList.appendChild(todoItemContainer);
      // markComplete
      let didComplete = todo.done;
      const isDone = document.createElement('input');
      isDone.setAttribute('type', 'checkbox');
      isDone.setAttribute('id', 'isDone');
      isDone.setAttribute('name', 'isDone');
      if (didComplete) {
        isDone.setAttribute('checked', '');
        todoItem.style.textDecoration = 'line-through';
      }
      const isDoneLabel = document.createElement('label');
      isDoneLabel.setAttribute('for', 'isDone');
      const checkBox = document.createElement('div');
      checkBox.append(isDone, isDoneLabel);
      todoItemContainer.insertBefore(checkBox, todoItem);

      isDone.addEventListener('click', async () => {
        if (isDone.checked) {
          todoItem.style.textDecoration = 'line-through';
          didComplete = true;
          await updateStatus(todo._id, didComplete, todo.task);
        } else {
          todoItem.style.textDecoration = 'none';
          didComplete = false;
          await updateStatus(todo._id, didComplete, todo.task);
        }
      });

      //updateBtn
      const updateBtn = document.createElement('button');
      updateBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

      updateBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.setAttribute('value', todo.task);
        todoItemContainer.insertBefore(input, todoItem);
        todoItemContainer.removeChild(todoItem);
        todoItemContainer.removeChild(checkBox);
        todoItemContainer.removeChild(updateBtn);

        //save Btn
        const saveBtn = document.createElement('button');
        saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
        saveBtn.addEventListener('click', async () => {
          await updateStatus(todo._id, didComplete, input.value);
        });

        todoItemContainer.insertBefore(saveBtn, deleteBtn);
        todoItemContainer.removeChild(deleteBtn);
      });

      const deleteBtn = createDeleteBtn(todo._id);
      todoItemContainer.appendChild(updateBtn);
      todoItemContainer.appendChild(deleteBtn);
    });
  }

  // add Todo container
  const addTodoContainer = document.createElement('div');
  addTodoContainer.setAttribute('id', 'addTodoContainer');

  const todoInput = document.createElement('input');
  todoInput.setAttribute('id', 'todoInput');
  todoInput.setAttribute('placeholder', 'Enter a todo...');

  const addTodoBtn = document.createElement('button');
  addTodoBtn.setAttribute('id', 'addTodoBtn');
  addTodoBtn.innerText = 'Add Todo';
  if (todoInput.value === '') {
    addTodoBtn.setAttribute('disabled', '');
  }
  todoInput.addEventListener('change', (e) => {
    if (e.target.value === '') {
      addTodoBtn.setAttribute('disabled', '');
    }
    if (e.target.value !== '') {
      addTodoBtn.removeAttribute('disabled');
    }
  });

  addTodoBtn.addEventListener('click', async () => {
    const todo = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: false,
        userId,
        task: todoInput.value,
      }),
    });
    if (todo.status === 200) {
      todoInput.value = '';
      location.reload();
    }
  });
  addTodoContainer.append(todoInput, addTodoBtn);

  container.appendChild(todoList);
  body.appendChild(addTodoContainer);
  body.appendChild(container);
});
