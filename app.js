const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

app.get('/', (req, res) => res.json({ message: 'Todo API is running' }));
app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  const todo = { id: todos.length + 1, task: req.body.task };
  todos.push(todo);
  res.status(201).json(todo);
});

module.exports = app;