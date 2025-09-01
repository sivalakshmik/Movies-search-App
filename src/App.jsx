
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Details from "./pages/Details";
import Search from "./pages/Search";
import { useFavorites } from "./contexts/FavoritesContext";
export default function App() {

 
    const { favorites } = useFavorites();
   
                                               
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-slate-100 to-indigo-500">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-slate-800">
            🎬 Movies Search
          </Link>
         </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/movie/:id" element={<Details />} />
        </Routes>
      </main>
    </div>
  );
}
