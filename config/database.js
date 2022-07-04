import pg from "pg";
import { config } from "dotenv";
config();

const { Client, Pool } = pg;
export const client = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});
