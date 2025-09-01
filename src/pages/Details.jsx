import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../api/omdb.js";
import { useFavorites } from "../contexts/FavoritesContext.jsx"; 

export default function Details() {
  const { id } = useParams();
 

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
const { favorites: favList = [], toggleFavorite = () => {} } = useFavorites() || {};
const isFavorite = favList.some((f) => f.imdbID === movie.imdbID);

useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-600">Loading…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-600 hover:underline font-medium"
      >
        ← Back to Search
      </Link>

      {movie && (
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-8">
          {/* Poster */}
          {movie.Poster && movie.Poster !== "N/A" && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-72 h-auto rounded-lg shadow-md"
            />
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {movie.Title}{" "}
              <span className="text-gray-500 font-medium">({movie.Year})</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {movie.Genre} • {movie.Runtime} • Rated {movie.Rated}
            </p>

            {/* Plot */}
            <p className="mt-4 text-gray-700 leading-relaxed">{movie.Plot}</p>

            {/* More Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Director:</span> {movie.Director}
              </p>
              <p>
                <span className="font-semibold">Writer:</span> {movie.Writer}
              </p>
              <p>
                <span className="font-semibold">Actors:</span> {movie.Actors}
              </p>
              <p>
                <span className="font-semibold">Language:</span> {movie.Language}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {movie.Country}
              </p>
              <p>
                <span className="font-semibold">Awards:</span> {movie.Awards}
              </p>
            </div>

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Ratings</h2>
                <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc list-inside">
                  {movie.Ratings.map((rating, index) => (
                    <li key={index}>
                      {rating.Source}: <span className="font-medium">{rating.Value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={ toggleFavorite}
              className={`mt-6 px-5 py-2 rounded-lg font-medium shadow-sm transition-colors ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
