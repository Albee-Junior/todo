import TodoItem from "./TodoItem";

function TodoList({ todos, loading, error, onToggle, onDelete }) {
  if (loading) {
    return <p className="py-8 text-center text-slate-500">Loading todos...</p>;
  }
  if (error) {
    return <p className="py-8 text-center text-red-600">Error: {error}</p>;
  }

  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-slate-500">
        No todos yet — add one above
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
