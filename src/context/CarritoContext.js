import { createContext, useContext } from "react";

export const CarritoContext = createContext(null);

export function useCarrito() {
  return useContext(CarritoContext);
}
