const reportStats = [
  { label: "Audit events (7d)", value: 41 },
  { label: "AI calls", value: 128 },
  { label: "Files in storage", value: 6 },
];

const exportCsv = () => {
  const rows = ["metric,value", ...reportStats.map((stat) => `"${stat.label}",${stat.value}`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "teamflow-report.csv";
  link.click();
  URL.revokeObjectURL(url);
};

const Reports = () => {
  return (
    <section className="page">
      <h1>Reporting</h1>
      <p className="page__lede">
        Management reporting, audit history, and workspace usage for the last
        seven days.
      </p>
      <button type="button" onClick={exportCsv}>
        Export CSV
      </button>
      <div className="stats">
        {reportStats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>
      <div className="panel">
        <h2>Upcoming</h2>
        <ul className="risk-list">
          <li>Structured logs, traces, and error tracking</li>
          <li>AI usage and cost breakdown per workspace</li>
          <li>Role-based admin dashboard with entitlement controls</li>
        </ul>
      </div>
    </section>
  );
};

export default Reports;
