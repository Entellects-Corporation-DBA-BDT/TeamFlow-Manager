-- Core identity tables for TeamFlow Manager.
--   psql -U postgres -f workspaces.sql

CREATE DATABASE teamflow_db;

\c teamflow_db

CREATE TABLE workspaces (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    owner_email     VARCHAR(150) NOT NULL,
    plan            VARCHAR(20) NOT NULL DEFAULT 'free'
                        CHECK (plan IN ('free', 'team', 'business', 'enterprise')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Profiles will later map to Supabase Auth (auth.users).
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    workspace_id    INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    full_name       VARCHAR(120) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    role            VARCHAR(20) NOT NULL DEFAULT 'member'
                        CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_seen_at    TIMESTAMP,
    joined_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_workspace_id ON users(workspace_id);
CREATE INDEX idx_users_workspace_active ON users(workspace_id) WHERE is_active = TRUE;
