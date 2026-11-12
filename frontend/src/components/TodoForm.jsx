import { useState } from "react";
function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setTitle("");
  }
  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-900"
      />
      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
        disabled={title.trim() === ""}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
