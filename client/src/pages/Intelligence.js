import { useMemo, useState } from "react";
import { aiInsights, issues } from "../data/mockWorkspace";
import { requestInsight } from "../lib/aiGateway";

const Intelligence = () => {
  const [query, setQuery] = useState("");
  const [gatewayNote, setGatewayNote] = useState("");

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return issues;
    return issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(term) ||
        issue.id.toLowerCase().includes(term) ||
        issue.epic.toLowerCase().includes(term)
    );
  }, [query]);

  const runGateway = async () => {
    try {
      const result = await requestInsight("status_summary", { query });
      setGatewayNote(`${result.source}: ${result.note || "ok"}`);
    } catch (error) {
      setGatewayNote(error instanceof Error ? error.message : "Gateway request failed");
    }
  };

  return (
    <section className="page">
      <h1>Project intelligence</h1>
      <p className="page__lede">
        Status summaries, risk labels, and search. Semantic retrieval (pgvector)
        and live model calls go through the AI gateway.
      </p>
      <input
        className="search-box"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search issues by key, title, or epic"
      />
      <button type="button" onClick={runGateway}>
        Refresh AI summary
      </button>
      {gatewayNote ? <p className="page__lede">{gatewayNote}</p> : null}

      <div className="panel">
        <h2>Status summary</h2>
        <p>{aiInsights.statusSummary}</p>
      </div>
      <div className="panel">
        <h2>Risks</h2>
        <ul className="risk-list">
          {aiInsights.risks.map((risk) => (
            <li key={risk.item}>
              <strong>{risk.item}</strong> · {risk.label} — {risk.note}
            </li>
          ))}
        </ul>
      </div>
      <div className="panel">
        <h2>Suggested priorities</h2>
        <ul className="risk-list">
          {aiInsights.priorities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="panel">
        <h2>Workload</h2>
        <p>{aiInsights.workload}</p>
      </div>
      <div className="panel">
        <h2>Search results</h2>
        <ul className="risk-list">
          {matches.map((issue) => (
            <li key={issue.id}>
              {issue.id} — {issue.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Intelligence;
