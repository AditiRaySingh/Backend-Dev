const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for tasks
let tasks = [];
let nextId = 1;

// ✅ Create a new task
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = { id: nextId++, title, completed: completed || false };
  tasks.push(task);
  res.status(201).json(task);
});

// ✅ Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ Get a single task by id
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

// ✅ Update a task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// ✅ Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
