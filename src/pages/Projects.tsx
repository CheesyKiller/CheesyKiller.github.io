import { useEffect, useMemo, useState } from "react";

import { readCache, writeCache, isFresh } from "../utility/github-cache";
import type { LanguageCode, Translations } from "../utility/language-helper";
import { createFlexDate, createList, print } from "../utility/html-generation-parseing";

import { USERNAME } from "../constants/text";
import { FORKS_TEXT, HIDE_ARCHIVED_TEXT, HIDE_FORKS_TEXT, LAST_EDITED_TEXT, LOADING_PROJECT_METADATA_TEXT, LOADING_REPOS_TEXT, PROJECTS_TITLE, VIEW_GITHUB_TEXT } from "../constants/pages/Projects";

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
  default_branch: string;
};

type ProjectJson = {
  NAME: Translations;
  DESCRIPTION: Translations;
  DATE_OF_LAST_EDIT: {
    DAY: number,
    MONTH: number,
    YEAR: number
  };
  PROJECT_LANGUAGES: Translations[];
};

function fallbackProjectJson(repo: GitHubRepo): ProjectJson {
  const d = new Date(repo.updated_at);

  return {
    NAME: { EN: repo.name, JA: repo.name },
    DESCRIPTION: { EN: repo.description ?? "", JA: repo.description ?? "" },
    DATE_OF_LAST_EDIT: {
      DAY: d.getDate(),
      MONTH: d.getMonth() + 1,
      YEAR: d.getFullYear()
    },
    PROJECT_LANGUAGES: [
      { EN: repo.language ?? "Unknown", JA: repo.language ?? "Unknown" },
    ],
  };
}

function projectDateToTimestamp(p: ProjectJson): number {
  const { YEAR, MONTH, DAY } = p.DATE_OF_LAST_EDIT;
  return new Date(YEAR, MONTH - 1, DAY).getTime();
}

const REPO_CACHE_KEY = `gh_repos_${USERNAME.GITHUB}_v1`;
const PROJECT_CACHE_KEY = `gh_projects_${USERNAME.GITHUB}_v1`;
const CACHE_TTL_MS = 6 * 360 * 1000;

type ProjectCacheEntry = {
  fetchedAt: number;
  value: ProjectJson | null;
};

type ProjectCache = Record<string, ProjectCacheEntry>;

async function fetchProjectJson(repo: GitHubRepo): Promise<ProjectJson | null> {
  const url = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/Project.json`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Project.json fetch failed: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as unknown;

  if (
    !data ||
    typeof data !== "object" ||
    !("NAME" in data) ||
    !("DESCRIPTION" in data) ||
    !("DATE_OF_LAST_EDIT" in data) ||
    !("PROJECT_LANGUAGES" in data)
  ) {
    return null;
  }

  return data as ProjectJson;
}

export default function Projects({ lang }: { lang: LanguageCode }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hideForks, setHideForks] = useState(true);
  const [hideArchived, setHideArchived] = useState(true);
  const [metaLoading, setMetaLoading] = useState(false);

  const [projectByRepo, setProjectByRepo] = useState<Record<string, ProjectJson>>({});

  const filteredProjects = useMemo(() => {
    return repos
      .filter((r) => !r.private)
      .filter((r) => (hideForks ? !r.fork : true))
      .filter((r) => (hideArchived ? !r.archived : true))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  }, [repos, hideForks, hideArchived]);

  const sortedProjects = useMemo(() => {
    return filteredProjects
      .map((repo) => {
        const meta = projectByRepo[repo.full_name] ?? fallbackProjectJson(repo);
        return { repo, meta };
      })
      .sort((a, b) =>
        projectDateToTimestamp(b.meta) - projectDateToTimestamp(a.meta)
      );
  }, [filteredProjects, projectByRepo]);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      setLoading(true);
      setError(null);

      const cached = readCache<GitHubRepo[]>(REPO_CACHE_KEY);

      if (cached?.value?.length) {
        setRepos(cached.value);
        if (isFresh(cached.fetchedAt, CACHE_TTL_MS)) {
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(
          `https://api.github.com/users/${USERNAME.GITHUB}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

        const data = (await res.json()) as GitHubRepo[];

        if (!cancelled) {
          setRepos(data);
          writeCache(REPO_CACHE_KEY, data);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!filteredProjects.length) return;

    let cancelled = false;

    async function loadProjectsJson() {
      setMetaLoading(true);
      try {
        const cached = readCache<ProjectCache>(PROJECT_CACHE_KEY);
        const nextMap: Record<string, ProjectJson> = {};
        const nextCache: ProjectCache = cached?.value ?? {};

        const isEntryFresh = (entry?: ProjectCacheEntry) =>
          !!entry && isFresh(entry.fetchedAt, CACHE_TTL_MS);

        const CONCURRENCY = 6;
        let i = 0;

        async function worker() {
          while (i < filteredProjects.length) {
            const idx = i++;
            const repo = filteredProjects[idx];

            const key = repo.full_name;
            const cachedEntry = nextCache[key];

            if (isEntryFresh(cachedEntry)) {
              nextMap[key] = cachedEntry.value ?? fallbackProjectJson(repo);
              continue;
            }

            try {
              const pj = await fetchProjectJson(repo);
              nextMap[key] = pj ?? fallbackProjectJson(repo);
              nextCache[key] = { fetchedAt: Date.now(), value: pj };
            } catch {
              nextMap[key] = fallbackProjectJson(repo);
            }
          }
        }

        await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

        if (!cancelled) {
          setProjectByRepo(nextMap);
          writeCache(PROJECT_CACHE_KEY, nextCache);
        }
      } finally {
        if (!cancelled) setMetaLoading(false);
      }
    }

    loadProjectsJson();
    return () => {
      cancelled = true;
    };
  }, [filteredProjects]);

  return (
    <section>
      {print(lang, PROJECTS_TITLE)}

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <label>
          <input
            type="checkbox"
            checked={hideForks}
            onChange={(e) => setHideForks(e.target.checked)}
          />{" "}
          {HIDE_FORKS_TEXT[lang]}
        </label>

        <label>
          <input
            type="checkbox"
            checked={hideArchived}
            onChange={(e) => setHideArchived(e.target.checked)}
          />{" "}
          {HIDE_ARCHIVED_TEXT[lang]}
        </label>

        <a href={`https://github.com/${USERNAME.GITHUB}`} target="_blank" rel="noreferrer">
          {VIEW_GITHUB_TEXT[lang]}
        </a>
      </div>

      <br/>

      {loading && <p>{LOADING_REPOS_TEXT[lang]}</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
      {metaLoading && !loading && <p>{LOADING_PROJECT_METADATA_TEXT[lang]}</p>}

      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        {sortedProjects.map((project) => {
          const repo = project.repo;
          const meta = projectByRepo[repo.full_name];
          const view = meta ?? fallbackProjectJson(repo);

          return (
            <article key={repo.id} className="card" style={{ textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  <strong>{view.NAME[lang]}</strong>
                </a>
                <span style={{ opacity: 0.75, fontSize: "0.9rem" }}>
                  ★ {repo.stargazers_count} • {FORKS_TEXT[lang]} {repo.forks_count}
                </span>
              </div>

              {!!view.DESCRIPTION[lang] && <p style={{ margin: "0.5rem 0" }}>{view.DESCRIPTION[lang]}</p>}

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", opacity: 0.8 }}>
                {print(lang, createFlexDate(
                  view.DATE_OF_LAST_EDIT.DAY,
                  view.DATE_OF_LAST_EDIT.MONTH,
                  view.DATE_OF_LAST_EDIT.YEAR,
                  LAST_EDITED_TEXT 
                ))}
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
              </div>

              {print(lang, createList(view.PROJECT_LANGUAGES))}
            </article>
          );
        })}
      </div>
    </section>
  );
}