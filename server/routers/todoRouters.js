const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/:userId', todoController.getTodos, (req, res, next) => {
  res.status(200).json(res.locals.todos);
});
router.post('/', todoController.addTodo, (req, res, next) => {
  res.status(200).json(res.locals.todo);
});
router.patch('/', todoController.updateTodo, (req, res, next) => {
  res.status(200).json('success');
});

router.delete('/:todoId', todoController.deleteTodo, (req, res, next) => {
  res.status(200).json('success');
});

module.exports = router;
