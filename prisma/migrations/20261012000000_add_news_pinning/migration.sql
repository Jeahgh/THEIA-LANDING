ALTER TABLE "NewsPost" ADD COLUMN "pinned" BOOLEAN NOT NULL DEFAULT false;

-- Preserve the news currently selected for the homepage.
UPDATE "NewsPost"
SET "pinned" = true
WHERE "id" IN (
  SELECT "id" FROM "NewsPost"
  WHERE "published" = true
  ORDER BY "sortOrder" ASC, "date" DESC
  LIMIT 4
);
