
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  database: process.env.POSTGRES_DATABASE || "parti",
  password: process.env.POSTGRES_PASSWORD || "Arzansara123",
  port: process.env.POSTGRES_PORT || 5432,
  host: process.env.POSTGRES_HOST || "127.0.0.1",
});

module.exports = { pool };
