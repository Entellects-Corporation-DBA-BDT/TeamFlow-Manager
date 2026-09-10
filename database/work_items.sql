-- Issues, epics, sprints, comments. Run after schema.sql.
--   psql -U postgres -d teamflow_db -f work_items.sql

\c teamflow_db

CREATE TABLE epics (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title           VARCHAR(200) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'open'
                        CHECK (status IN ('open', 'in_progress', 'done')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sprints (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(80) NOT NULL,
    starts_on       DATE NOT NULL,
    ends_on         DATE NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'planning'
                        CHECK (status IN ('planning', 'active', 'closed')),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_sprints_dates CHECK (ends_on >= starts_on)
);

CREATE UNIQUE INDEX uq_sprints_one_active
    ON sprints(project_id)
    WHERE status = 'active';

CREATE TABLE issues (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    epic_id         INTEGER REFERENCES epics(id) ON DELETE SET NULL,
    sprint_id       INTEGER REFERENCES sprints(id) ON DELETE SET NULL,
    key             VARCHAR(20) NOT NULL,
    type            VARCHAR(20) NOT NULL
                        CHECK (type IN ('epic', 'story', 'task', 'bug')),
    title           VARCHAR(240) NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'backlog'
                        CHECK (status IN ('backlog', 'todo', 'in_progress', 'review', 'done')),
    priority        VARCHAR(10) NOT NULL DEFAULT 'medium'
                        CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    story_points    SMALLINT CHECK (story_points IS NULL OR story_points BETWEEN 1 AND 13),
    reporter_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assignee_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX uq_issues_project_key ON issues(project_id, key);
CREATE INDEX idx_issues_project_id ON issues(project_id);
CREATE INDEX idx_issues_sprint_id ON issues(sprint_id);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_assignee_id ON issues(assignee_id);

CREATE TRIGGER trg_issues_updated_at
    BEFORE UPDATE ON issues
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE comments (
    id              SERIAL PRIMARY KEY,
    issue_id        INTEGER NOT NULL REFERENCES issues(id) ON DELETE CASCADE,
    author_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    body            TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_issue_id ON comments(issue_id);
