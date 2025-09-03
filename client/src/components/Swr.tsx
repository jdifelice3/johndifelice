// WorksList.tsx
import React, { useEffect, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";

type Work = {
  id: string;
  title: string;
  description: string;
  form: string;
  wordCount: number;
  pageCount: number;
  genre: string;
  fileName: string;
  manuscriptIsVisible: boolean;
};

const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

// ---- localStorage persistence for user-edited fields ----
const PATCH_STORAGE_KEY = "work-local-patches";
/**
 * A minimal “patch map” that persists per-item property edits locally.
 * Shape: { [id]: Partial<Work> }
 */
function useLocalPatches() {
  const read = (): Record<string, Partial<Work>> => {
    try {
      const raw = localStorage.getItem(PATCH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };
  const write = (patches: Record<string, Partial<Work>>) => {
    localStorage.setItem(PATCH_STORAGE_KEY, JSON.stringify(patches));
  };
  return { read, write };
}

export default function Swr() {
  const { data, error, isLoading, mutate } = useSWR<Work[]>(
    "http://localhost:3000/api/works",
    fetcher,
    {
      revalidateOnFocus: false,
      // If you want: keep previous while revalidating to avoid list flicker
      keepPreviousData: true,
    }
  );

  const { read, write } = useLocalPatches();

  // Merge any locally saved patches into the server data (survive reloads)
  const merged = useMemo<Work[] | undefined>(() => {
    if (!data) return data;
    const patches = read();
    return data.map((w) => ({ ...w, ...(patches[w.id] ?? {}) }));
  }, [data]);

  // Toggle a property with optimistic UI, SWR cache update, server PATCH, rollback on error,
  // and save a local patch so it persists across reloads.
  const toggleVisible = async (id: string) => {
    if (!merged) return;

    // Next state (optimistic)
    const next = merged.map((w) =>
      w.id === id ? { ...w, manuscriptIsVisible: !w.manuscriptIsVisible } : w
    );

    // Update SWR cache optimistically, no revalidation yet
    mutate(next, { revalidate: false, populateCache: true });

    // Persist this specific change in localStorage
    const patches = read();
    const newValue =
      next.find((w) => w.id === id)?.manuscriptIsVisible ?? false;
    write({
      ...patches,
      [id]: { ...(patches[id] ?? {}), manuscriptIsVisible: newValue },
    });

    // Tell the API (best effort). If it fails, rollback cache + localStorage.
    try {
      const res = await fetch(`http://localhost:3000/api/works/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manuscriptIsVisible: newValue }),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      // Optionally revalidate to reconcile with the source of truth
      // (keeps optimistic result if server agrees)
      mutate();
    } catch (e) {
      // Roll back SWR cache to previous merged state
      mutate(merged, { revalidate: false, populateCache: true });

      // Roll back localStorage
      const p = read();
      if (p[id]) {
        const { manuscriptIsVisible, ...rest } = p[id];
        const cleaned = Object.keys(rest).length ? rest : undefined;
        if (cleaned) p[id] = cleaned;
        else delete p[id];
        write(p);
      }
      console.error("PATCH failed, rolled back:", e);
    }
  };

  if (isLoading) return <p>Loading works…</p>;
  if (error) return <p style={{ color: "crimson" }}>{String(error)}</p>;
  if (!merged?.length) return <p>No works found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {merged.map((w) => (
        <li
          key={w.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{w.title}</strong>
            <button onClick={() => toggleVisible(w.id)}>
              {w.manuscriptIsVisible ? "Hide manuscript" : "Show manuscript"}
            </button>
          </div>

          <small>
            {w.form} • {w.genre} • {w.pageCount} pages ({w.wordCount} words)
          </small>

          {w.manuscriptIsVisible && (
            <div style={{ marginTop: 8 }}>
              <em>Manuscript preview would render here…</em>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
