import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css"
import { PAGE_LIST } from "./constants/routes";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import NotFound from "./pages/NotFound";

const ROUTE_COMPONENTS = {
  [PAGE_LIST.HOME.ROUTE]: <Home />,
  [PAGE_LIST.PROJECTS.ROUTE]: <Projects />,
  [PAGE_LIST.EXPERIENCE.ROUTE]: <Experience />,
} as const;

function Header() {
  const location = useLocation();

  const page = Object.values(PAGE_LIST).find(
    (p) => p.ROUTE === location.pathname
  );

  const title = page?.TITLE ?? "Resume Page Not Found";

  useEffect(() => {
    document.title = `Jacob Abts - ${title}`;
  }, [title]);

  return (
    <header className="header">
      <h1 style={{ margin: 0 }}>Jacob Abts - {title}</h1>

      <nav className="nav">
        {Object.values(PAGE_LIST).map((p) => (
          <NavLink key={p.ROUTE} to={p.ROUTE} end={p.ROUTE === "/"}>
            {p.NAV_TITLE}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div className="layout">
      <Header/>

      <main>
        <Routes>
          {Object.entries(ROUTE_COMPONENTS).map(([path, element]) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        Jacob Abts | <a href="https://github.com/CheesyKiller">GitHub</a>
      </footer>
    </div>
  )
}