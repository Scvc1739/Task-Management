function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  meta,
  done,
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition ${
        done
          ? "bg-white/60 opacity-80"
          : "bg-white hover:shadow-md"
      }`}
    >
      <div className="flex justify-between gap-4">
        {/* LEFT */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] px-2 py-0.5 bg-gray-100 rounded">
              #{id}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "DONE"
                  ? "bg-green-500"
                  : status === "IN PROGRESS"
                  ? "bg-orange-400"
                  : "bg-blue-500"
              }`}
            ></span>
          </div>

          <h3
            className={`text-sm font-bold ${
              done ? "line-through text-gray-400" : ""
            }`}
          >
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-2 min-w-[140px]">
          <select className="h-9 bg-gray-100 rounded text-xs font-bold px-2">
            <option>TODO</option>
            <option>IN PROGRESS</option>
            <option>DONE</option>
          </select>

          <div className="flex gap-2 text-gray-400">
            <span className="cursor-pointer">✏️</span>
            <span className="cursor-pointer">🗑️</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-4 pt-4 border-t flex justify-between items-center text-[10px]">
        <span className="text-gray-400 uppercase">
          {meta}
        </span>
        <span className="font-bold text-xs">{priority}</span>
      </div>
    </div>
  );
}

export default TaskCard;





