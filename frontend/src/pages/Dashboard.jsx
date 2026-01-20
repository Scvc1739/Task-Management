import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Fetch tasks
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Create task
  const addTask = async () => {
    if (!title.trim() || !description.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        status: "todo",
      }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  // 🔹 Update status
  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 🔹 Filter tasks
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="flex gap-8 p-8">
      {/* LEFT: CREATE TASK */}
      <div className="w-[360px] bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Task</h2>

        <input
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-2 mb-4 h-28"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium"
        >
          Add Task
        </button>
      </div>

      {/* RIGHT: TASK LIST */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Task List</h2>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4">
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

        {/* TASK ITEMS */}
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 mb-3 flex justify-between items-start"
          >
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">
                {task.description}
              </p>

              <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
                {task.status}
              </span>
            </div>

            {/* STATUS + DELETE (same place, same row) */}
            <div className="flex items-center gap-4">
              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value)
                }
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="todo">todo</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
