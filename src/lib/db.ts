import postgres from 'postgres';

import { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } from '$env/static/private';

export const sql = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  port: parseInt(DATABASE_PORT),
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});