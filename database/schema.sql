-- TeamFlow Manager core schema: projects, milestones, and tasks.
-- Run after workspaces.sql:
--   psql -U postgres -f workspaces.sql
--   psql -U postgres -d teamflow_db -f schema.sql
--   psql -U postgres -d teamflow_db -f work_items.sql
--   psql -U postgres -d teamflow_db -f shared_services.sql

\c teamflow_db

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE projects (
    id              SERIAL PRIMARY KEY,
    workspace_id    INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'active'
                        CHECK (status IN ('active', 'on_hold', 'completed', 'archived')),
    start_date      DATE NOT NULL,
    end_date        DATE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_projects_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_projects_workspace_id ON projects(workspace_id);
CREATE UNIQUE INDEX uq_projects_workspace_name ON projects(workspace_id, name);

CREATE TRIGGER trg_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE milestones (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(150) NOT NULL,
    due_date        DATE NOT NULL,
    is_complete     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_milestones_project_id ON milestones(project_id);

CREATE TABLE tasks (
    id              SERIAL PRIMARY KEY,
    project_id      INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id    INTEGER REFERENCES milestones(id) ON DELETE SET NULL,
    name            VARCHAR(200) NOT NULL,
    assignee_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
    priority        VARCHAR(10) NOT NULL DEFAULT 'medium'
                        CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    start_date      DATE NOT NULL,
    duration_days   INTEGER NOT NULL CHECK (duration_days > 0),
    progress        SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    color           VARCHAR(7) DEFAULT '#6366f1',
    depends_on      INTEGER REFERENCES tasks(id) ON DELETE SET NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_milestone_id ON tasks(milestone_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);

CREATE TRIGGER trg_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
