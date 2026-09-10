import GanttChart from "../Components/GanttChart";

const Timeline = () => {
  return (
    <section className="page">
      <h1>Timeline</h1>
      <p className="page__lede">
        Schedule, duration, and task dependencies for the current project.
      </p>
      <GanttChart />
    </section>
  );
};

export default Timeline;
