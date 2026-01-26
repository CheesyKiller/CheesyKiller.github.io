import { useEffect, useMemo, useState } from "react";

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
};

const USERNAME = "CheesyKiller";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // simple UI filters
  const [hideForks, setHideForks] = useState(true);
  const [hideArchived, setHideArchived] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Add Accept header so topics can be returned when available.
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as GitHubRepo[];

        if (!cancelled) setRepos(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return repos
      .filter((r) => !r.private)
      .filter((r) => (hideForks ? !r.fork : true))
      .filter((r) => (hideArchived ? !r.archived : true))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  }, [repos, hideForks, hideArchived]);

  return (
    <section>
      <h2>Projects</h2>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <label>
          <input
            type="checkbox"
            checked={hideForks}
            onChange={(e) => setHideForks(e.target.checked)}
          />{" "}
          Hide forks
        </label>

        <label>
          <input
            type="checkbox"
            checked={hideArchived}
            onChange={(e) => setHideArchived(e.target.checked)}
          />{" "}
          Hide archived
        </label>

        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer">
          View GitHub profile
        </a>
      </div>

      {loading && <p>Loading repos…</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        {filtered.map((repo) => (
          <article key={repo.id} className="card" style={{ textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                <strong>{repo.name}</strong>
              </a>
              <span style={{ opacity: 0.75, fontSize: "0.9rem" }}>
                ★ {repo.stargazers_count} • Forks {repo.forks_count}
              </span>
            </div>

            {repo.description && <p style={{ margin: "0.5rem 0" }}>{repo.description}</p>}

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", opacity: 0.8 }}>
              {repo.language && <span>{repo.language}</span>}
              <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noreferrer">
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}