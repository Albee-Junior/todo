require("dotenv").config();
const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, done, created_at FROM todos ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET /todos failed:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { title } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "title is required and must be a non-empty string" });
    }
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, done, created_at",
      [title.trim()],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /todos failed:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }

    const { title, done } = req.body ?? {};
    const fields = [];
    const values = [];

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res
          .status(400)
          .json({ error: "title must be a non-empty string" });
      }
      values.push(title.trim());
      fields.push(`title = $${values.length}`);
    }

    if (done !== undefined) {
      if (typeof done !== "boolean") {
        return res.status(400).json({ error: "done must be a boolean" });
      }
      values.push(done);
      fields.push(`done = $${values.length}`);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide at least one of: title, done" });
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE todos SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING id, title, done, created_at
      `,
      values,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PATCH /todos/:id failed:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }

    const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).end();
  } catch (err) {
    console.error("DELETE /todos/:id failed:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
