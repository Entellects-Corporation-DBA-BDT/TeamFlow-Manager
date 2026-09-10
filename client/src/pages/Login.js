import { Link, useNavigate } from "react-router-dom";
import "../Components/AppShell/AppShell.css";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    // Supabase Auth will replace this local preview hop.
    navigate("/app");
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={onSubmit}>
        <h1>TeamFlow Manager</h1>
        <p>Sign in with your work email to open your workspace.</p>
        <label htmlFor="email">Work email</label>
        <input id="email" type="email" name="email" required autoComplete="username" />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoComplete="current-password"
        />
        <button type="submit">Continue to workspace</button>
        <p>
          <Link to="/">Back to product site</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
