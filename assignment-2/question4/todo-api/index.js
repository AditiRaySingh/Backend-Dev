const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Task API! Use /todos to manage tasks.");
});

// CREATE
app.post("/todos", (req, res) => {
  if (!req.body.title) {
    return res.status(400).send("Title is required");
  }
  todos.push(req.body);
  res.status(201).send("Todo added"); // <-- important: status 201
});

// READ
app.get("/todos", (req, res) => {
  res.status(200).json(todos); // <-- important: status 200
});

// UPDATE
app.put("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < todos.length) {
    todos[index] = req.body;
    res.status(200).send("Todo updated");
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE
app.delete("/todos/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    res.status(200).send("Todo deleted");
  } else {
    res.status(404).send("Todo not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
