const Todo = require('../models/TodoModel');

const todoController = {};

todoController.addTodo = (req, res, next) => {
  const { task, done, userId } = req.body;
  Todo.create({ task, done, userId }, (err, todo) => {
    if (err) {
      return next({
        log: 'ERROR with adding todo',
        message: { err: err.message },
      });
    }
    res.locals.todo = todo;
    next();
  });
};

todoController.getTodos = (req, res, next) => {
  const { userId } = req.params;
  Todo.find({ userId }, (err, todos) => {
    if (err) {
      return next({
        log: 'ERROR with getting todos',
        message: { err: err.message },
      });
    }
    res.locals.todos = todos;
    next();
  });
};

todoController.deleteTodo = (req, res, next) => {
  const { todoId } = req.params;
  Todo.findByIdAndRemove(todoId, (err, todo) => {
    if (err) {
      return next({
        log: 'ERROR with deleting todo',
        message: { err: err.message },
      });
    }
    next();
  });
};

todoController.updateTodo = (req, res, next) => {
  const { task, todoId, done } = req.body;
  const update = { task, done };
  Todo.findByIdAndUpdate(
    todoId,
    update,
    { userFindAndModify: false },
    (err, update) => {
      if (err) {
        return next({
          log: 'ERROR with updating todo',
          message: { err: err.message },
        });
      }
      console.log('UPDATE', update);
      next();
    }
  );
};

module.exports = todoController;
