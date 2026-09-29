-- ============================================================
-- BHARAT SANSKRITI - CENTRALIZED POSTGRESQL DATABASE SCHEMA
-- Relational DDL for Users, Stories, Sevas, TempleWork, Reviews & Favorites
-- ============================================================

-- Enable UUID Extension if available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'USER', -- 'USER' | 'TEMPLE_ADMIN'
  location VARCHAR(255) DEFAULT 'India',
  skills TEXT[] DEFAULT '{}',
  bio TEXT DEFAULT '',
  avatar_initial VARCHAR(10) DEFAULT 'U',
  temple_name VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. STORIES TABLE
CREATE TABLE IF NOT EXISTS stories (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  person VARCHAR(255) DEFAULT '',
  place VARCHAR(255) DEFAULT '',
  tradition VARCHAR(255) DEFAULT '',
  story_type VARCHAR(50) DEFAULT 'GENERAL', -- 'PERSONAL' | 'FACTUAL' | 'GENERAL'
  verification_status VARCHAR(50) DEFAULT 'NEEDS_VERIFICATION', -- 'PERSONAL_STORY' | 'SUPPORTED_FACT' | 'NEEDS_VERIFICATION' | 'ADMIN_REVIEW' | 'REJECTED' | 'REPORTED'
  verification_reason TEXT DEFAULT '',
  has_audio BOOLEAN DEFAULT FALSE,
  audio_duration VARCHAR(50) DEFAULT '',
  audio_id VARCHAR(128) DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SEVAS TABLE (Temple Volunteer Opportunities)
CREATE TABLE IF NOT EXISTS sevas (
  id VARCHAR(64) PRIMARY KEY,
  temple_admin_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  required_skills TEXT[] DEFAULT '{}',
  location VARCHAR(255) NOT NULL,
  date_details VARCHAR(255) DEFAULT '',
  status VARCHAR(50) DEFAULT 'OPEN', -- 'OPEN' | 'CLOSED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SEVA APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS seva_applications (
  id VARCHAR(64) PRIMARY KEY,
  seva_id VARCHAR(64) REFERENCES sevas(id) ON DELETE CASCADE,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  application_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING' | 'ACCEPTED' | 'REJECTED'
  message TEXT DEFAULT '',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(seva_id, user_id)
);

-- 5. TEMPLE WORK PROJECTS TABLE
CREATE TABLE IF NOT EXISTS temple_work_projects (
  id VARCHAR(64) PRIMARY KEY,
  temple_admin_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  category VARCHAR(100) NOT NULL, -- 'Granite Stone Carving' | 'Bronze Idol Casting' | 'Temple Mural Painting' | etc.
  project_size VARCHAR(50) DEFAULT 'Medium', -- 'Small' | 'Medium' | 'Large' | 'Monumental'
  complexity VARCHAR(50) DEFAULT 'Moderate', -- 'Basic' | 'Moderate' | 'High' | 'Master Shilpi'
  duration VARCHAR(50) DEFAULT '1 month',
  materials TEXT DEFAULT '',
  num_artisans INTEGER DEFAULT 1,
  suggested_budget_min NUMERIC(12, 2) DEFAULT 0,
  suggested_budget_max NUMERIC(12, 2) DEFAULT 0,
  final_budget NUMERIC(12, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'POSTED', -- 'POSTED' | 'APPLIED' | 'SELECTED' | 'OFFER_MADE' | 'OFFER_ACCEPTED' | 'PAYMENT_CONFIRMED' | 'WORK_IN_PROGRESS' | 'COMPLETED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TEMPLE WORK APPLICATIONS TABLE (Artisan Proposals)
CREATE TABLE IF NOT EXISTS temple_work_applications (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) REFERENCES temple_work_projects(id) ON DELETE CASCADE,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  proposal_text TEXT DEFAULT '',
  expected_timeline VARCHAR(100) DEFAULT '',
  skills_ref TEXT[] DEFAULT '{}',
  application_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING' | 'SELECTED' | 'REJECTED'
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_id)
);

-- 7. TEMPLE WORK OFFERS TABLE (Agreed Offer & Fee Breakdown)
CREATE TABLE IF NOT EXISTS temple_work_offers (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) REFERENCES temple_work_projects(id) ON DELETE CASCADE,
  artisan_user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  platform_fee NUMERIC(12, 2) NOT NULL, -- 10%
  artisan_payout NUMERIC(12, 2) NOT NULL, -- 90%
  status VARCHAR(50) DEFAULT 'OFFER_MADE', -- 'OFFER_MADE' | 'OFFER_ACCEPTED' | 'PAYMENT_CONFIRMED'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(50) NOT NULL, -- 'seva' | 'templework' | 'heritage' | 'story'
  target_id VARCHAR(64) NOT NULL,
  target_title VARCHAR(255) DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  verified_experience BOOLEAN DEFAULT FALSE,
  cultural_relevance_score INTEGER DEFAULT 80,
  moderation_status VARCHAR(50) DEFAULT 'APPROVED', -- 'PENDING' | 'APPROVED' | 'REJECTED' | 'REPORTED' | 'ADMIN_REVIEW'
  outcome_reason TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. REVIEW REPORTS TABLE
CREATE TABLE IF NOT EXISTS review_reports (
  id VARCHAR(64) PRIMARY KEY,
  review_id VARCHAR(64) REFERENCES reviews(id) ON DELETE CASCADE,
  reporter_user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  reason VARCHAR(100) NOT NULL, -- 'Fake review' | 'Unrelated content' | 'Spam' | 'Offensive content' | 'False information'
  user_note TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS favorites (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(50) NOT NULL, -- 'story' | 'artisan' | 'item'
  target_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, target_type, target_id)
);

-- ============================================================
-- PERFORMANCE & FILTER INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_verification_status ON stories(verification_status);
CREATE INDEX IF NOT EXISTS idx_seva_applications_seva_id ON seva_applications(seva_id);
CREATE INDEX IF NOT EXISTS idx_seva_applications_user_id ON seva_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_temple_work_applications_project_id ON temple_work_applications(project_id);
CREATE INDEX IF NOT EXISTS idx_reviews_target_id ON reviews(target_id);
CREATE INDEX IF NOT EXISTS idx_review_reports_review_id ON review_reports(review_id);
