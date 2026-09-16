-- =============================================================================
-- Sugarpine Migration v4 — the clean cut
-- - Page groups become "Topics" / "Reference"
-- - Entries can carry an image and a YouTube video
-- - Tables from the old structure go away
-- Run in the Supabase SQL editor (dev first, then prod).
-- =============================================================================

-- Page groups
ALTER TABLE pages DROP CONSTRAINT pages_group_check;
UPDATE pages SET "group" = CASE WHEN slug = 'ai-glossary' THEN 'Reference' ELSE 'Topics' END;
ALTER TABLE pages ADD CONSTRAINT pages_group_check CHECK ("group" IN ('Topics', 'Reference'));

-- Media on entries (all optional)
ALTER TABLE entries ADD COLUMN image_url     TEXT;
ALTER TABLE entries ADD COLUMN image_alt     TEXT;
ALTER TABLE entries ADD COLUMN image_caption TEXT;
ALTER TABLE entries ADD COLUMN youtube_id    TEXT;
ALTER TABLE entries ADD COLUMN youtube_title TEXT;

-- Old structure: primer sections, State-of-the-Art summaries, related links
DROP TABLE IF EXISTS page_sections;
DROP TABLE IF EXISTS page_summaries;
DROP TABLE IF EXISTS page_related;
