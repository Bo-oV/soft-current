import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FavoritesContext } from "./useFavorites";
import type { FavoritesContextValue } from "../types/favorites";

const STORAGE_KEY = "softcurrent:favorites";

function getStoredFavoriteIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedFavorites = window.localStorage.getItem(STORAGE_KEY);
    const parsedFavorites: unknown = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    return Array.isArray(parsedFavorites)
      ? parsedFavorites.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getStoredFavoriteIds);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addToFavorites = useCallback((productId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId) ? currentIds : [...currentIds, productId],
    );
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== productId),
    );
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.includes(productId),
    [favoriteIds],
  );

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      favoritesCount: favoriteIds.length,
    }),
    [
      addToFavorites,
      clearFavorites,
      favoriteIds,
      isFavorite,
      removeFromFavorites,
      toggleFavorite,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
