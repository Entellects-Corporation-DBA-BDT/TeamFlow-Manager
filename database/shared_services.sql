-- Shared services: notifications, files, audit, AI gateway logs.
-- Semantic search: enable pgvector in Supabase, then uncomment embeddings.
--   psql -U postgres -d teamflow_db -f shared_services.sql

\c teamflow_db

CREATE TABLE notifications (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    body            TEXT,
    channel         VARCHAR(20) NOT NULL DEFAULT 'in_app'
                        CHECK (channel IN ('in_app', 'email', 'mobile')),
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, created_at DESC)
    WHERE is_read = FALSE;

CREATE TABLE attachments (
    id              SERIAL PRIMARY KEY,
    issue_id        INTEGER REFERENCES issues(id) ON DELETE CASCADE,
    uploaded_by     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    storage_path    TEXT NOT NULL,
    file_name       VARCHAR(255) NOT NULL,
    content_type    VARCHAR(120),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_events (
    id              SERIAL PRIMARY KEY,
    workspace_id    INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    actor_id        INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action          VARCHAR(80) NOT NULL,
    entity_type     VARCHAR(80) NOT NULL,
    entity_id       INTEGER,
    metadata        JSONB,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_workspace_id ON audit_events(workspace_id);

CREATE TABLE ai_prompts (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(80) NOT NULL,
    version         INTEGER NOT NULL DEFAULT 1,
    purpose         VARCHAR(120) NOT NULL,
    template        TEXT NOT NULL,
    model           VARCHAR(80) NOT NULL DEFAULT 'pending',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (slug, version)
);

CREATE TABLE ai_usage_logs (
    id              SERIAL PRIMARY KEY,
    workspace_id    INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    prompt_id       INTEGER REFERENCES ai_prompts(id) ON DELETE SET NULL,
    kind            VARCHAR(40) NOT NULL,
    tokens_in       INTEGER,
    tokens_out      INTEGER,
    cost_cents      INTEGER,
    status          VARCHAR(20) NOT NULL DEFAULT 'stubbed',
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CREATE EXTENSION IF NOT EXISTS vector;
-- CREATE TABLE issue_embeddings (
--     issue_id    INTEGER PRIMARY KEY REFERENCES issues(id) ON DELETE CASCADE,
--     embedding   VECTOR(1536),
--     updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
-- );
