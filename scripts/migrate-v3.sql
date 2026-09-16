-- =============================================================================
-- Sugarpine Migration v3
-- - Entries are filed under one or more topics with no primary. Membership
--   lives in `entry_topics`; `entries.page_id` goes away and slugs become
--   unique site-wide (entry URLs are /<year>/<slug>).
-- Run in the Supabase SQL editor (dev first, then prod).
-- =============================================================================

CREATE TABLE entry_topics (
  entry_id  INTEGER NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  page_id   INTEGER NOT NULL REFERENCES pages(id)   ON DELETE CASCADE,
  PRIMARY KEY (entry_id, page_id)
);

-- Carry every existing entry's topic across
INSERT INTO entry_topics (entry_id, page_id)
SELECT id, page_id FROM entries;

-- Retire the single-topic column
ALTER TABLE entries DROP CONSTRAINT entries_page_id_slug_key;
ALTER TABLE entries DROP COLUMN page_id;
ALTER TABLE entries ADD CONSTRAINT entries_slug_key UNIQUE (slug);

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.entry_topics TO service_role;
GRANT SELECT ON public.entry_topics TO anon;

-- New tables come up with row-level security on; the site reads anonymously
CREATE POLICY "Public read" ON entry_topics FOR SELECT TO anon USING (true);
