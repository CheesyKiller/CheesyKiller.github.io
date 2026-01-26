import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>
        Go back <Link to="/">home</Link>.
      </p>
    </section>
  );
}