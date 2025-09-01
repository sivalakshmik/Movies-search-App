import {React , useState}from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";


export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };


  return (
    
    <div className="bg-white shadow-card rounded-xl overflow-hidden flex flex-col">
      {/* Poster */}
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-64 w-full object-cover"
        />
      ) : (
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{movie.year}</p>

        <div className="mt-auto flex justify-between items-center">
          {/* Details Link */}
          <Link to={`/movie/${movie.imdbID}`}>
          <img src={movie.Poster} alt={movie.Title} />
          < h3>{movie.Title}</h3>
          </Link>
          


          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(movie)}
            className={`px-3 py-1 rounded-lg text-sm font-medium shadow-sm transition-colors ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isFavorite ? "★ Fav" : "☆ Fav"}
          </button>
        </div>
      </div>
    </div>
  );
}
