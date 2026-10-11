import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export const getErrorMessage = (error, fallback = "Something went wrong") => {
  if (error && !error.response) {
    return "Can't reach the server. Make sure the backend is running on port 5000.";
  }
  return error?.response?.data?.message || fallback;
};

// Auth
export const registerCustomer = (data) => api.post("/customers/register", data);
export const loginCustomer = (data) => api.post("/customers/login", data);
export const getMe = () => api.get("/customers/me");
export const logoutCustomer = () => api.post("/customers/logout");

// Products
export const getProducts = (params) => api.get("/products", { params });
export const getProductById = (id) => api.get(`/products/${id}`);

// Wishlist
export const getWishlist = () => api.get("/wishlist");
export const addToWishlist = (productId) => api.post(`/wishlist/${productId}`);
export const removeFromWishlist = (productId) =>
  api.delete(`/wishlist/${productId}`);
export const toggleWishlist = (productId) =>
  api.patch(`/wishlist/${productId}/toggle`);

// The navbar listens for this so its wishlist count stays in sync with the backend
export const WISHLIST_CHANGED_EVENT = "wishlist-changed";
export const notifyWishlistChanged = () =>
  window.dispatchEvent(new Event(WISHLIST_CHANGED_EVENT));

// Cart
export const getCart = () => api.get("/cart");
export const addToCart = (productId) => api.post(`/cart/${productId}`);
export const updateCartQuantity = (productId, quantity) =>
  api.patch(`/cart/${productId}`, { quantity });
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);

export default api;
