import postgres from 'postgres';

import { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } from '$env/static/private';

export const sql = postgres({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});