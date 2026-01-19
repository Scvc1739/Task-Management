const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    status: "todo",
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE task status
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find((t) => t.id == id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
