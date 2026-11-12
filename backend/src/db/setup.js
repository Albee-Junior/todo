require("dotenv").config();
const { Client } = require("pg");

async function setup() {
  const client = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });

  await client.connect();
  console.log("✅ Connected to Postgres");

  await client.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title      TEXT        NOT NULL,
      done       BOOLEAN     NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log("✅ todos table ensured");

  await client.end();
  console.log("✅ Done");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
