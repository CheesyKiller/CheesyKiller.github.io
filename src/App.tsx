import { NavLink, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css"

import NotFound from "./pages/NotFound";

import { type LanguageCode, SupportedLanguages, getInitialLang } from "./utility/language-helper";

import { PAGE_LIST } from "./constants/routes";
import { FULL_NAME, USERNAME } from "./constants/text";

function Header({ lang }: { lang: LanguageCode }) {
  const location = useLocation();

  const page = Object.values(PAGE_LIST).find(
    (p) => p.ROUTE === location.pathname
  );

  const title = page?.TITLE[lang] ?? "Resume Page Not Found";

  useEffect(() => {
    document.title = `${FULL_NAME} - ${title}`;
  }, [title]);

  return (
    <header className="header">
      <h1 style={{ margin: 0 }}>{FULL_NAME} - {title}</h1>

      <nav className="nav">
        {Object.values(PAGE_LIST).map(({ ROUTE, NAV_TITLE }) => (
          <NavLink key={ROUTE} to={ROUTE} end={ROUTE === "/"}>
            {NAV_TITLE[lang]}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default function App() {
  const [lang, setLang] = useState<LanguageCode>(getInitialLang());
  const githubPath = `https://github.com/${USERNAME.GITHUB}`;

  return (
    <div className="layout">
      <Header lang={lang} />

      <main>
        <Routes>
          {Object.values(PAGE_LIST).map(({ ROUTE, ELEMENT }) => (
            <Route key={ROUTE} path={ROUTE} element={<ELEMENT lang={lang}/>} />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-left">
          {FULL_NAME} | <Link to={githubPath}>GitHub</Link>
        </div>

        <div className="lang-switch">
          {Object.values(SupportedLanguages).map((l) => (
            <button key={l.CODE} onClick={() => setLang(l.CODE)}>
              {l.LABEL}
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
}