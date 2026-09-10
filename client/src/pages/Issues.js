import { useMemo, useState } from "react";
import { issues } from "../data/mockWorkspace";

const STATUSES = ["all", "backlog", "todo", "in_progress", "review", "done"];

const Issues = () => {
  const [status, setStatus] = useState("all");

  const visible = useMemo(() => {
    if (status === "all") return issues;
    return issues.filter((issue) => issue.status === status);
  }, [status]);

  return (
    <section className="page">
      <h1>Issues & backlog</h1>
      <p className="page__lede">
        Track bugs, stories, and tasks across the workspace. Filter by workflow
        status to focus the current queue.
      </p>
      <label htmlFor="issue-status">Status</label>
      <select
        id="issue-status"
        className="search-box"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        {STATUSES.map((value) => (
          <option key={value} value={value}>
            {value.replace("_", " ")}
          </option>
        ))}
      </select>
      <table className="issue-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Epic</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>
                <span className={`pill pill--${issue.type}`}>{issue.type}</span>
              </td>
              <td>{issue.title}</td>
              <td>
                <span className={`pill pill--${issue.status}`}>{issue.status.replace("_", " ")}</span>
              </td>
              <td>
                <span className={`pill pill--${issue.priority}`}>{issue.priority}</span>
              </td>
              <td>{issue.assignee}</td>
              <td>{issue.epic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Issues;
