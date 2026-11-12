function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id, !todo.done)}
        className="h-5 w-5 cursor-pointer accent-slate-900"
      />
      <span
        className={
          todo.done
            ? "flex-1 text-slate-400 line-through"
            : "flex-1 text-slate-800"
        }
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
