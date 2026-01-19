import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-[#f0f3f4] p-5 mb-6"
    >
      <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          add_task
        </span>
        Create New Task
      </h2>

      {/* TITLE */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Implement API auth"
          className="w-full mt-1 h-10 px-3 rounded border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide technical context..."
          className="w-full mt-1 min-h-[100px] p-3 rounded border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
        />
      </div>

      {/* PRIORITY */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600">
          Priority
        </label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {["Low", "Medium", "High"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`py-2 text-xs font-bold rounded border transition ${
                priority === p
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full mt-2 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition"
      >
        + Create Task
      </button>
    </form>
  );
}

export default TaskForm;


