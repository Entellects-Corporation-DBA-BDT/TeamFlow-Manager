-- Reporting queries against teamflow_db.
--   psql -U postgres -d teamflow_db -f queries.sql

SELECT
    u.full_name AS assignee,
    COUNT(*) AS open_tasks,
    ROUND(AVG(t.progress), 1) AS avg_progress
FROM tasks t
JOIN users u ON u.id = t.assignee_id
WHERE t.progress < 100
GROUP BY u.full_name
ORDER BY open_tasks DESC;

SELECT
    w.name AS workspace_name,
    p.status,
    COUNT(*) AS project_count
FROM projects p
JOIN workspaces w ON w.id = p.workspace_id
GROUP BY w.name, p.status
ORDER BY w.name, p.status;

SELECT
    p.name AS project_name,
    m.name AS milestone_name,
    m.due_date,
    (m.due_date - CURRENT_DATE) AS days_remaining
FROM milestones m
JOIN projects p ON p.id = m.project_id
WHERE m.is_complete = FALSE
  AND m.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY m.due_date ASC;

SELECT
    status,
    type,
    COUNT(*) AS issue_count
FROM issues
GROUP BY status, type
ORDER BY status, type;

-- Sprint velocity: completed story points per closed sprint.
SELECT
    s.name          AS sprint_name,
    s.starts_on,
    s.ends_on,
    COUNT(i.id)     AS issues_closed,
    COALESCE(SUM(i.story_points), 0) AS story_points_closed,
    s.ends_on - s.starts_on AS sprint_days
FROM sprints s
LEFT JOIN issues i ON i.sprint_id = s.id AND i.status = 'done'
WHERE s.status = 'closed'
GROUP BY s.id, s.name, s.starts_on, s.ends_on
ORDER BY s.ends_on DESC;
