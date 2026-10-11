import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCart as addToCartApi,
  getCart,
  getErrorMessage,
  removeFromCart as removeFromCartApi,
  updateCartQuantity as updateCartQuantityApi,
} from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingIds, setPendingIds] = useState({});

  const refreshCart = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getCart();
      setCartItems(data.cart);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load your cart."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Every mutation replaces local state with the cart returned by the server,
  // so the backend stays the single source of truth.
  const runMutation = useCallback(async (productId, request) => {
    setPendingIds((prev) => ({ ...prev, [productId]: true }));
    try {
      const { data } = await request();
      setCartItems(data.cart);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: getErrorMessage(err, "Unable to update cart.") };
    } finally {
      setPendingIds((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  }, []);

  const addToCart = useCallback(
    (productId) => runMutation(productId, () => addToCartApi(productId)),
    [runMutation]
  );

  const updateQuantity = useCallback(
    (productId, quantity) =>
      runMutation(productId, () => updateCartQuantityApi(productId, quantity)),
    [runMutation]
  );

  const removeFromCart = useCallback(
    (productId) => runMutation(productId, () => removeFromCartApi(productId)),
    [runMutation]
  );

  const totalUnits = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const getQuantity = useCallback(
    (productId) =>
      cartItems.find((item) => item.product._id === productId)?.quantity || 0,
    [cartItems]
  );

  const isPending = useCallback((productId) => Boolean(pendingIds[productId]), [pendingIds]);

  const value = {
    cartItems,
    loading,
    error,
    totalUnits,
    subtotal,
    refreshCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getQuantity,
    isPending,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
