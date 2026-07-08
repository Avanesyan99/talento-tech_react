import { useEffect, useState } from "react";
import { CarritoContext } from "./CarritoContext";

const STORAGE_KEY = "carrito";

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        const maxQty = product.stock ?? existing.stock ?? Infinity;
        const nextQty = Math.min(existing.quantity + quantity, maxQty);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: nextQty } : item
        );
      }

      const maxQty = product.stock ?? Infinity;
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: Math.min(quantity, maxQty),
        },
      ];
    });
  }

  function incrementItem(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock ?? Infinity) }
          : item
      )
    );
  }

  function decrementItem(id) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const value = {
    items,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}
