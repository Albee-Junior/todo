import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  const pending = todos.filter((t) => !t.done).length;
  const completed = todos.length - pending;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Todos</h1>
          <p className="text-sm text-slate-500">
            {pending} pending · {completed} completed
          </p>
        </header>

        <TodoForm onAdd={addTodo} />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <TodoList
          todos={todos}
          loading={loading}
          error={null}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
