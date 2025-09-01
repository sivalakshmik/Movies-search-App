
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (imdbID) => favorites.some((f) => f.imdbID === imdbID);

  const addFavorite = (item) => {
    setFavorites((prev) => (isFavorite(item.imdbID) ? prev : [...prev, item]));
  };

  const removeFavorite = (imdbID) => {
    setFavorites((prev) => prev.filter((f) => f.imdbID !== imdbID));
  };
  const toggleFavorite = (item) => {
  isFavorite(item.imdbID)
    ? removeFavorite(item.imdbID)
    : addFavorite(item);
};


const value = useMemo(
  () => ({ favorites, isFavorite, addFavorite, removeFavorite ,toggleFavorite}),
  [favorites]
);


 return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
