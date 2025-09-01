
import React from "react";

export default function SearchBar({ query, onQueryChange, type, onTypeChange }) {
  
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search movies, series, episodes…"
        className="flex-1 rounded-lg border-slate-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full md:w-48 rounded-lg border-slate-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        
      </select>
    </div>
  );
}
