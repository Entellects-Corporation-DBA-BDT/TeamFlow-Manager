export const coreTools = [
  {
    id: "dashboards",
    icon: "📈",
    title: "Status dashboards",
    description:
      "Real-time project health, timeline, and Gantt-style visibility for leads and contributors.",
  },
  {
    id: "issues",
    icon: "🎫",
    title: "Issues, stories & epics",
    description:
      "Track bugs, stories, tasks, and epics in a shared backlog with sprint planning and progress.",
  },
  {
    id: "collab",
    icon: "👥",
    title: "Role-based collaboration",
    description:
      "Comments, notifications, file sharing, and management reporting scoped by workspace role.",
  },
  {
    id: "ai",
    icon: "✨",
    title: "AI project intelligence",
    description:
      "Status summaries, risk classification, prioritization suggestions, and natural-language search.",
  },
  {
    id: "reporting",
    icon: "📋",
    title: "Reporting & audit",
    description:
      "Workload insights, analytics, and an audit trail designed for shared identity and entitlements.",
  },
];

export const workspaceSteps = [
  {
    step: 1,
    title: "Sign in to your workspace",
    description: "Centralized identity via Supabase Auth, with roles and product entitlements.",
  },
  {
    step: 2,
    title: "Plan the backlog and sprint",
    description: "Organize epics, stories, and tasks, then pull work into the current sprint.",
  },
  {
    step: 3,
    title: "Track, collaborate, and review",
    description: "Comment, attach files, watch the timeline, and let AI draft the status update.",
  },
];

export const valueProps = [
  {
    id: "plan",
    title: "One place for status, issues, and execution",
    description:
      "Plan sprints, track bugs and stories, and see Gantt-style progress without switching tools.",
  },
  {
    id: "love",
    title: "Collaboration that respects roles",
    description:
      "Owners, admins, members, and viewers share comments, files, and reports with least-privilege access.",
  },
  {
    id: "flexible",
    title: "AI-assisted project intelligence",
    description:
      "Summaries, risk flags, workload insights, and semantic search — routed through a shared AI gateway.",
  },
];

export const ganttTasks = [
  { id: 1, name: "Sprint 12 planning", startWeek: 0, duration: 1, progress: 100, color: "#6366f1" },
  { id: 2, name: "Auth, roles & entitlements", startWeek: 0, duration: 2, progress: 55, color: "#0ea5e9" },
  { id: 3, name: "Issue tracker & comments", startWeek: 1, duration: 2, progress: 40, color: "#22c55e" },
  { id: 4, name: "AI gateway & usage logs", startWeek: 3, duration: 2, progress: 25, color: "#f59e0b" },
  { id: 5, name: "Reporting dashboards", startWeek: 4, duration: 2, progress: 10, color: "#ec4899" },
];
