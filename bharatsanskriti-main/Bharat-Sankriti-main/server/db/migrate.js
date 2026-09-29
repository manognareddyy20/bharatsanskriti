import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Client } = pg;

async function migrate() {
  console.log('=== STARTING POSTGRESQL DATABASE MIGRATION ===');
  
  const host = process.env.PGHOST || 'localhost';
  const port = parseInt(process.env.PGPORT || '5432', 10);
  const user = process.env.PGUSER || 'postgres';
  const password = process.env.PGPASSWORD || 'postgres';
  const dbName = process.env.PGDATABASE || 'bharat_sanskriti';

  // Step 1: Connect to default postgres DB to check/create target database
  const rootClient = new Client({ host, port, user, password, database: 'postgres' });
  try {
    await rootClient.connect();
    const dbCheck = await rootClient.query("SELECT 1 FROM pg_database WHERE datname = $1", [dbName]);
    if (dbCheck.rows.length === 0) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await rootClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.warn(`Warning connecting to root postgres DB: ${err.message}. Will attempt connecting directly to target DB.`);
  } finally {
    await rootClient.end().catch(() => {});
  }

  // Step 2: Connect to target database and execute DDL schema script
  const targetClient = new Client({ host, port, user, password, database: dbName });
  try {
    await targetClient.connect();
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing DDL Schema Script...');
    await targetClient.query(schemaSql);
    console.log('✓ All 10 PostgreSQL tables and 8 indexes created successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await targetClient.end();
  }
}

migrate();
