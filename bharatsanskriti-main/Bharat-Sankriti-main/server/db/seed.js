import bcrypt from 'bcryptjs';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Client } = pg;

async function seed() {
  console.log('=== STARTING POSTGRESQL DATABASE SEEDING ===');

  const host = process.env.PGHOST || 'localhost';
  const port = parseInt(process.env.PGPORT || '5432', 10);
  const user = process.env.PGUSER || 'postgres';
  const password = process.env.PGPASSWORD || 'postgres';
  const dbName = process.env.PGDATABASE || 'bharat_sanskriti';

  const client = new Client({ host, port, user, password, database: dbName });

  try {
    await client.connect();

    // Hash default passwords using bcryptjs
    const userPasswordHash = await bcrypt.hash('user123', 10);
    const adminPasswordHash = await bcrypt.hash('admin123', 10);

    console.log('Seeding Users...');

    // 1. Seed Temple Admin
    await client.query(`
      INSERT INTO users (id, name, email, password_hash, role, location, skills, bio, avatar_initial, temple_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (email) DO NOTHING
    `, [
      'admin-ramappa-1',
      'Venkata Ramana (Temple Admin)',
      'admin@ramappa.org',
      adminPasswordHash,
      'TEMPLE_ADMIN',
      'Mulugu District, Telangana',
      ARRAY['Temple Administration', 'Heritage Management'],
      'Temple Administrator & Executive Trustee at Ramappa Temple.',
      'T',
      'Ramappa Temple (Rudreshwara)'
    ]);

    // 2. Seed Regular User
    await client.query(`
      INSERT INTO users (id, name, email, password_hash, role, location, skills, bio, avatar_initial)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (email) DO NOTHING
    `, [
      'user-seed-1',
      'Ramesh Kumar',
      'user@example.com',
      userPasswordHash,
      'USER',
      'Warangal, Telangana',
      ARRAY['Photography', 'Oral History Documentation'],
      'Heritage enthusiast and volunteer contributor.',
      'R'
    ]);

    console.log('Seeding Sevas & Applications...');

    // 3. Seed Sample Seva
    await client.query(`
      INSERT INTO sevas (id, temple_admin_id, title, description, required_skills, location, date_details, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING
    `, [
      'opp-1',
      'admin-ramappa-1',
      'Ramappa Temple Heritage Documentator & Guide Seva',
      'Assist pilgrims and record historical inscriptions of Kakatiya architecture during festival days.',
      ARRAY['Heritage Documentation', 'Local History', 'Guiding'],
      'Palampet, Mulugu District, Telangana',
      'Saturdays & Sundays (Ongoing)',
      'OPEN'
    ]);

    // 4. Seed Seva Application
    await client.query(`
      INSERT INTO seva_applications (id, seva_id, user_id, application_status, message)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (seva_id, user_id) DO NOTHING
    `, [
      'app-seed-1',
      'opp-1',
      'user-seed-1',
      'ACCEPTED',
      'I am passionate about Kakatiya history and experienced in photography.'
    ]);

    console.log('Seeding TempleWork Projects...');

    // 5. Seed TempleWork Project
    await client.query(`
      INSERT INTO temple_work_projects (id, temple_admin_id, title, description, category, project_size, complexity, duration, materials, num_artisans, suggested_budget_min, suggested_budget_max, final_budget, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (id) DO NOTHING
    `, [
      'proj-1',
      'admin-ramappa-1',
      'Chola-Style Granite Nandi Mandapa Pillar Flute Restoration',
      'Precision restoration of intricate lotus capital and pillar flute carving using traditional chisel techniques.',
      'Granite Stone Carving',
      'Medium',
      'Master Shilpi',
      '2 months',
      'Black Granite, Traditional Chisel set',
      2,
      45000.00,
      60000.00,
      50000.00,
      'POSTED'
    ]);

    console.log('Seeding Cultural Stories & Reviews...');

    // 6. Seed Cultural Story
    await client.query(`
      INSERT INTO stories (id, user_id, title, description, person, place, tradition, story_type, verification_status, verification_reason, has_audio, audio_duration)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO NOTHING
    `, [
      'cultural-story-seed-1',
      'user-seed-1',
      'Grandmother Bathukamma Oral Memory',
      'My grandmother Satyavati taught us how to stack floral layers for Bathukamma festival while singing folk songs.',
      'Satyavati Amma (Grandmother)',
      'Warangal, Telangana',
      'Bathukamma Flower Stacking',
      'PERSONAL',
      'PERSONAL_STORY',
      'Living family memory / oral history',
      true,
      '01:45'
    ]);

    // 7. Seed Review
    await client.query(`
      INSERT INTO reviews (id, user_id, target_type, target_id, target_title, rating, review_text, verified_experience, cultural_relevance_score, moderation_status, outcome_reason)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
    `, [
      'rev-seed-1',
      'user-seed-1',
      'seva',
      'opp-1',
      'Ramappa Temple Heritage Documentator & Guide Seva',
      5,
      'The temple festival was well organized and I learned about our local Kakatiya architectural tradition. Sacred experience!',
      true,
      95,
      'APPROVED',
      'Approved — Verified Cultural Contribution'
    ]);

    console.log('✓ Development Seed Data populated successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
