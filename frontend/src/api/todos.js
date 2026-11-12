const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.status === 204) return null;

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.error || `Request failed with status ${res.status}`);
  }

  return body;
}

export const getTodos = () => request("/todos");
export const createTodo = (title) =>
  request("/todos", { method: "POST", body: JSON.stringify({ title }) });
export const updateTodo = (id, patch) =>
  request(`/todos/${id}`, { method: "PATCH", body: JSON.stringify(patch) });
export const deleteTodo = (id) => request(`/todos/${id}`, { method: "DELETE" });
