import { useState, useEffect } from "react";
import * as api from "../api/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getTodos();
        if (!cancelled) setTodos(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function addTodo(title) {
    setError(null);
    try {
      const created = await api.createTodo(title);
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTodo(id, done) {
    setError(null);
    const previous = todos;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));

    try {
      await api.updateTodo(id, { done });
    } catch (err) {
      setTodos(previous);
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    setError(null);
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo };
}
