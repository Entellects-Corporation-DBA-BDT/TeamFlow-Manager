import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import GanttChart from "../GanttChart";
import { coreTools, workspaceSteps, valueProps } from "../../data/features";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <p className="hero__eyebrow">AI-enabled project execution</p>
        <h1>
          One place for status, issues, and
          <br />
          <span>AI-assisted project intelligence</span>.
        </h1>
        <p>
          TeamFlow Manager is an AI-enabled project execution and management
          platform: dashboards and Gantt timelines, issue tracking and sprints,
          role-based collaboration, reporting, and a shared AI gateway.
        </p>
        <Link to="/login" className="hero__cta">
          Sign in to workspace
        </Link>
      </section>

      <section id="tools" className="tools">
        <h2>Project execution, collaboration, and intelligence</h2>
        <div className="tools__grid">
          {coreTools.map((tool) => (
            <div className="tool-card" key={tool.id}>
              <div className="tool-card__icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workspace" className="workspace">
        <h2>Shared identity, then the work</h2>
        <p className="section-lede">
          Authentication, roles, notifications, files, and audit history are
          shared services. The product layer is the backlog, sprint, and timeline.
        </p>
        <div className="workspace__steps">
          {workspaceSteps.map((item) => (
            <div className="workspace-step" key={item.step}>
              <div className="workspace-step__number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tasks" className="tasks">
        <div className="tasks__text">
          <h2>From epic to sprint to status</h2>
          <p>
            Work rolls from epics into stories, bugs, and tasks, then into a
            sprint board with comments, files, and reporting. The timeline
            stays in sync as progress changes.
          </p>
        </div>
        <div className="tasks__hierarchy">
          <div className="hierarchy-node">Epic</div>
          <div className="hierarchy-arrow">→</div>
          <div className="hierarchy-node">Backlog</div>
          <div className="hierarchy-arrow">→</div>
          <div className="hierarchy-node hierarchy-node--active">Sprint</div>
        </div>
      </section>

      <section className="value-props">
        {valueProps.map((item, index) => (
          <div
            className={`value-prop ${index % 2 === 1 ? "value-prop--reverse" : ""}`}
            key={item.id}
          >
            <div className="value-prop__text">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div className="value-prop__visual">
              <div className={`visual-card visual-card--${item.id}`} />
            </div>
          </div>
        ))}
      </section>

      <section id="gantt" className="gantt-section">
        <h2>Timeline and Gantt-style visibility</h2>
        <p className="section-lede">
          Delivery track for the current program increment, with percent complete
          on each workstream.
        </p>
        <GanttChart />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
