// src/pages/Search.jsx
import React, { useEffect, useMemo, useState } from "react";
import { searchMovies } from "../api/omdb";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";


export default function Search() {
  const [query, setQuery] = useState("Batman");
  const [type, setType] = useState(""); 
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / 10)), [total]);
  //console.log("Items to render:", items);

  useEffect(() => {
    let active = true;
    async function run() {
      if (!query.trim()) {
        setItems([]);
        setTotal(0);
        setError("");
        return;
      }
      setLoading(true);
      setError("");
      try {
        const { items, total, error } = await searchMovies({ query, page, type });
        if (!active) return;
        setItems(items);
        setTotal(total);
        setError(error || "");
      } catch (e) {
        if (!active) return;
        setItems([]);
        setTotal(0);
        setError(e.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [query, page, type]);

  return (
    <div className="space-y-6">
      <SearchBar
        query={query}
        onQueryChange={(val) => {
          setQuery(val);
          setPage(1);
        }}
        type={type}
        onTypeChange={(val) => {
          setType(val);
          setPage(1);
        }}
      />

      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-600">Loading…</div>
      ) : !Array.isArray(items) || items.length === 0 ? (
        <div className="text-slate-500">No results.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
