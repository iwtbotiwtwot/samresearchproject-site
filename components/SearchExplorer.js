"use client";

import { useMemo, useState } from "react";

export default function SearchExplorer({ entries }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return entries;
    return entries.filter((entry) => {
      const haystack = `${entry.title} ${entry.type} ${entry.terms}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [entries, query]);

  return (
    <div className="sam-search-explorer">
      <label htmlFor="site-search">Search pages, aliases, version IDs, campaign IDs, and exact terms</label>
      <input id="site-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try SLCV1.2, H000143, A0, Exact Write, or SLCMP4483" autoComplete="off" />
      <p aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
      <div className="sam-search-results">
        {results.map((entry) => <a href={entry.href} key={`${entry.href}-${entry.title}`}><span>{entry.type}</span><strong>{entry.title}</strong><small>{entry.terms}</small></a>)}
        {!results.length ? <div className="sam-search-empty">No indexed result matches every search term.</div> : null}
      </div>
    </div>
  );
}
