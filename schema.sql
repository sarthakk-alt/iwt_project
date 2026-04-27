-- Run once against your Postgres database before starting the app.
-- Example:
--   createdb chronoculture
--   psql chronoculture < schema.sql

CREATE TABLE IF NOT EXISTS comments (
    id          SERIAL PRIMARY KEY,
    poi_id      VARCHAR(255) NOT NULL,
    author      VARCHAR(100) NOT NULL,
    body        TEXT         NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
