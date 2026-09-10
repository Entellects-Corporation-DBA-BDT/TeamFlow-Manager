import { NavLink, Outlet } from "react-router-dom";
import { currentUser, notifications, workspace } from "../../data/mockWorkspace";
import "./AppShell.css";

const links = [
  { to: "/app", label: "Dashboard", end: true },
  { to: "/app/issues", label: "Issues" },
  { to: "/app/sprints", label: "Sprints" },
  { to: "/app/timeline", label: "Timeline" },
  { to: "/app/intelligence", label: "Intelligence" },
  { to: "/app/reports", label: "Reports" },
];

const AppShell = () => {
  return (
    <div className="shell">
      <aside className="shell__nav">
        <div className="shell__brand">◆ TeamFlow</div>
        <p className="shell__workspace">{workspace.name}</p>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? "shell__link shell__link--active" : "shell__link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="shell__user">
          {currentUser.fullName}
          <span>{currentUser.role}</span>
        </p>
      </aside>
      <div className="shell__main">
        <header className="shell__top">
          <span className="shell__badge">{workspace.plan} plan</span>
          <div className="shell__alerts">
            {notifications.slice(0, 2).map((item) => (
              <span key={item.id}>{item.text}</span>
            ))}
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AppShell;
