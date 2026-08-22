-- Run this in your Neon SQL Editor to add restaurant image fields
-- (Only needed if you already ran schema.sql before this update)

ALTER TABLE restaurant
  ADD COLUMN IF NOT EXISTS hero_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600',
  ADD COLUMN IF NOT EXISTS about_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800';

-- Update existing row with defaults
UPDATE restaurant SET
  hero_image = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600',
  about_image = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
WHERE hero_image = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600';
