import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import StockBadge from "../components/StockBadge.jsx";
import WishlistButton from "../components/WishlistButton.jsx";
import { getErrorMessage, getProductById, getWishlist } from "../services/api";
import formatPrice from "../utils/formatPrice";

const PERKS = [
  { icon: "🚚", label: "Free delivery" },
  { icon: "↩️", label: "7-day returns" },
  { icon: "🔒", label: "Secure payment" },
];

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    Promise.all([getProductById(id), getWishlist().catch(() => null)])
      .then(([productRes, wishlistRes]) => {
        if (ignore) return;
        setProduct(productRes.data.product);
        setInWishlist(
          Boolean(wishlistRes?.data.wishlist.some((item) => item._id === id))
        );
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err, "Something went wrong while loading the product."));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id, reloadKey]);

  if (loading) {
    return <StatusMessage type="loading" title="Loading product..." />;
  }

  if (error) {
    return (
      <StatusMessage
        type="error"
        icon="⚠️"
        title={error}
        action={
          <div className="flex gap-3">
            <button className="btn-primary" onClick={() => setReloadKey((key) => key + 1)}>
              Try Again
            </button>
            <Link to="/products" className="btn-outline">
              Back to Products
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/products"
        className="w-fit animate-fade-up text-sm font-medium text-slate-400 transition hover:text-fuchsia-300"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative animate-fade-up">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-orange-500/30 blur-3xl" />
          <div className="gradient-border relative rounded-[2rem] p-px">
            <div className="group overflow-hidden rounded-[calc(2rem-1px)] bg-[#0c0916]">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="flex animate-fade-up flex-col gap-5 [animation-delay:120ms]">
          <span className="w-fit rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fuchsia-300">
            {product.category}
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {product.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gradient font-display text-4xl font-bold">{formatPrice(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
          <p className="text-lg leading-relaxed text-slate-400">{product.description}</p>

          <div className="grid grid-cols-3 gap-3">
            {PERKS.map((perk) => (
              <div key={perk.label} className="glass rounded-2xl p-3 text-center">
                <span className="text-xl">{perk.icon}</span>
                <p className="mt-1 text-xs text-slate-400">{perk.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:max-w-sm">
            <AddToCartButton product={product} />
            <WishlistButton productId={product._id} initialSaved={inWishlist} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
