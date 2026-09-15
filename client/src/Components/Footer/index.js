const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__brand">◆ TeamFlow Manager</div>
      <p className="footer__tagline">
        One place for project status, issues, tasks, collaboration, reporting, and AI-assisted intelligence.
      </p>
      <p className="footer__copy">
        © {new Date().getFullYear()} TeamFlow Manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
