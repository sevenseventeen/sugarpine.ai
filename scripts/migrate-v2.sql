-- =============================================================================
-- Sugarpine Migration v2
-- - Add page_summaries table (pinned State of the Art per topic page)
-- - Add entries table (timestamped feed items with standalone URLs)
-- =============================================================================

-- State of the Art summaries — one "current" per Living Landscape page
CREATE TABLE page_summaries (
  id           SERIAL PRIMARY KEY,
  page_id      INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  period       TEXT NOT NULL,       -- e.g. "June 2026"
  today        TEXT,
  near_future  TEXT,
  bold_visions TEXT,
  is_current   BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page_id, period)
);

-- Feed entries — timestamped advances, each with a standalone page URL
CREATE TABLE entries (
  id           SERIAL PRIMARY KEY,
  page_id      INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  slug         TEXT NOT NULL,
  title        TEXT NOT NULL,
  summary      TEXT NOT NULL,
  body         TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page_id, slug)
);

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_summaries TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.entries TO service_role;
GRANT SELECT ON public.page_summaries TO anon;
GRANT SELECT ON public.entries TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
