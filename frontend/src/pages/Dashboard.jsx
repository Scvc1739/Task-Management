import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------------------
     FETCH TASKS (GET /tasks)
  ---------------------------- */
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------------------
     CREATE TASK (POST /tasks)
  ---------------------------- */
  const addTask = async () => {
    if (!title || !description) return;

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  /* ---------------------------
     UPDATE STATUS (PATCH)
  ---------------------------- */
  const changeStatus = async (id, status) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    fetchTasks();
  };

  /* ---------------------------
     FILTER LOGIC
  ---------------------------- */
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="flex gap-8 p-8">
      {/* LEFT: CREATE TASK */}
      <div className="w-[350px] bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Task</h2>

        <input
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-2 mb-4"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>

      {/* RIGHT: TASK LIST */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Task List</h2>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 mb-6">
          {["all", "todo", "in-progress", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TASKS */}
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-500">
                {task.description}
              </p>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {task.status}
              </span>
            </div>

            <select
              value={task.status}
              onChange={(e) =>
                changeStatus(task.id, e.target.value)
              }
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="todo">todo</option>
              <option value="in-progress">in-progress</option>
              <option value="done">done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
