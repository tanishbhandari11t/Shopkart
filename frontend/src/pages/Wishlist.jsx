import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusMessage from "../components/StatusMessage.jsx";
import WishlistCard from "../components/WishlistCard.jsx";
import {
  getErrorMessage,
  getWishlist,
  notifyWishlistChanged,
  removeFromWishlist,
} from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadWishlist = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getWishlist();
      setWishlist(data.wishlist);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) => prev.filter((product) => product._id !== productId));
      notifyWishlistChanged();
      return { ok: true };
    } catch (err) {
      return { ok: false, message: getErrorMessage(err, "Unable to remove product.") };
    }
  };

  if (loading) {
    return <StatusMessage type="loading" title="Loading your wishlist..." />;
  }

  if (error) {
    return (
      <StatusMessage
        type="error"
        icon="⚠️"
        title="Something went wrong."
        message="We couldn't load your wishlist."
        action={
          <button className="btn-primary" onClick={loadWishlist}>
            Try Again
          </button>
        }
      />
    );
  }

  if (wishlist.length === 0) {
    return (
      <StatusMessage
        icon="❤️"
        title="Your wishlist is empty"
        message="Save products you love and find them here later."
        action={
          <Link to="/products" className="btn-primary px-6 py-3">
            Browse Products
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex animate-fade-up flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-pink-300">Saved for later</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-white sm:text-5xl">
            My <span className="text-gradient">Wishlist</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {wishlist.length} {wishlist.length === 1 ? "product" : "products"} saved
          </p>
        </div>
        <Link to="/products" className="btn-outline">
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product, index) => (
          <WishlistCard key={product._id} product={product} index={index} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
