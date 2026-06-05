-- =============================================================================
-- Sugarpine Migration v1
-- - Add slug column (text, URL-safe page identifier)
-- - Add position column (integer, explicit display order)
-- - Change id from text to integer (auto-increment)
-- - Update all child table foreign keys accordingly
--
-- Run in Supabase SQL Editor — dev first, then prod.
-- =============================================================================

BEGIN;

-- Step 1: Add slug and position columns to pages
ALTER TABLE pages ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS position INTEGER;

-- Step 2: Populate slugs from current text IDs
UPDATE pages SET slug = CASE id
  WHEN 'what-is-ai'      THEN 'what-is-ai'
  WHEN 'key-terms'       THEN 'ai-glossary'
  WHEN 'text-generation' THEN 'text-generation'
  WHEN 'image-video'     THEN 'image-and-video'
  WHEN 'deepfakes'       THEN 'deepfakes-and-authenticity'
  WHEN 'science'         THEN 'ai-in-science'
  WHEN 'math'            THEN 'mathematics'
  WHEN 'coding'          THEN 'coding'
  WHEN 'robotics'        THEN 'robotics'
  WHEN 'anthropic-stack' THEN 'the-anthropic-stack'
  WHEN 'agent-platforms' THEN 'agent-platforms'
  WHEN 'frameworks'      THEN 'builders-frameworks'
  WHEN 'big-picture'     THEN 'signal-vs-hype'
  WHEN 'benchmarks'      THEN 'benchmarks'
END;

-- Step 3: Populate positions (AI Glossary first per Josh's request)
UPDATE pages SET position = CASE id
  WHEN 'key-terms'       THEN 1   -- AI Glossary
  WHEN 'what-is-ai'      THEN 2   -- What is AI?
  WHEN 'text-generation' THEN 3
  WHEN 'image-video'     THEN 4
  WHEN 'deepfakes'       THEN 5
  WHEN 'science'         THEN 6
  WHEN 'math'            THEN 7
  WHEN 'coding'          THEN 8
  WHEN 'robotics'        THEN 9
  WHEN 'anthropic-stack' THEN 10
  WHEN 'agent-platforms' THEN 11
  WHEN 'frameworks'      THEN 12
  WHEN 'big-picture'     THEN 13
  WHEN 'benchmarks'      THEN 14
END;

-- Step 4: Add temporary integer ID to pages
ALTER TABLE pages ADD COLUMN int_id SERIAL;

-- Step 5: Add temporary integer columns to child tables
ALTER TABLE page_sections ADD COLUMN new_page_id INTEGER;
ALTER TABLE page_cards    ADD COLUMN new_page_id INTEGER;
ALTER TABLE page_related  ADD COLUMN new_page_id INTEGER;
ALTER TABLE page_related  ADD COLUMN new_related_id INTEGER;

-- Step 6: Populate new integer IDs in child tables via join
UPDATE page_sections s   SET new_page_id    = p.int_id FROM pages p WHERE s.page_id    = p.id;
UPDATE page_cards c      SET new_page_id    = p.int_id FROM pages p WHERE c.page_id    = p.id;
UPDATE page_related r    SET new_page_id    = p.int_id FROM pages p WHERE r.page_id    = p.id;
UPDATE page_related r    SET new_related_id = p.int_id FROM pages p WHERE r.related_id = p.id;

-- Step 7: Drop existing FK constraints if present (safe to run even if they don't exist)
ALTER TABLE page_sections DROP CONSTRAINT IF EXISTS page_sections_page_id_fkey;
ALTER TABLE page_cards    DROP CONSTRAINT IF EXISTS page_cards_page_id_fkey;
ALTER TABLE page_related  DROP CONSTRAINT IF EXISTS page_related_page_id_fkey;
ALTER TABLE page_related  DROP CONSTRAINT IF EXISTS page_related_related_id_fkey;

-- Step 8: Swap old text columns for new integer ones in child tables
ALTER TABLE page_sections DROP COLUMN page_id;
ALTER TABLE page_sections RENAME COLUMN new_page_id TO page_id;

ALTER TABLE page_cards DROP COLUMN page_id;
ALTER TABLE page_cards RENAME COLUMN new_page_id TO page_id;

ALTER TABLE page_related DROP COLUMN page_id;
ALTER TABLE page_related DROP COLUMN related_id;
ALTER TABLE page_related RENAME COLUMN new_page_id    TO page_id;
ALTER TABLE page_related RENAME COLUMN new_related_id TO related_id;

-- Step 9: Replace pages primary key with integer
ALTER TABLE pages DROP CONSTRAINT pages_pkey;
ALTER TABLE pages DROP COLUMN id;
ALTER TABLE pages RENAME COLUMN int_id TO id;
ALTER TABLE pages ADD PRIMARY KEY (id);

-- Step 10: Add constraints to slug and position
ALTER TABLE pages ALTER COLUMN slug     SET NOT NULL;
ALTER TABLE pages ALTER COLUMN position SET NOT NULL;
ALTER TABLE pages ADD CONSTRAINT pages_slug_unique UNIQUE (slug);

-- Step 11: Add proper FK constraints on child tables
ALTER TABLE page_sections ADD CONSTRAINT page_sections_page_id_fkey
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE;
ALTER TABLE page_cards ADD CONSTRAINT page_cards_page_id_fkey
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE;
ALTER TABLE page_related ADD CONSTRAINT page_related_page_id_fkey
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE;
ALTER TABLE page_related ADD CONSTRAINT page_related_related_id_fkey
  FOREIGN KEY (related_id) REFERENCES pages(id) ON DELETE CASCADE;

-- Step 12: Grant sequence access to service_role
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

COMMIT;
