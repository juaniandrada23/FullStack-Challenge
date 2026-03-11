import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('Falta DATABASE_URL en las variables de entorno');
    }

    pool = new Pool({ connectionString });
  }

  return pool;
}
