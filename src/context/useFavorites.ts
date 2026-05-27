import { createContext, useContext } from "react";
import type { FavoritesContextValue } from "../types/favorites";

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
