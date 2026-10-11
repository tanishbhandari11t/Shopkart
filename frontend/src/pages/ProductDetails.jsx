import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.jsx";
import Corners from "../components/Corners.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import StockBadge from "../components/StockBadge.jsx";
import WishlistButton from "../components/WishlistButton.jsx";
import { getErrorMessage, getProductById, getWishlist } from "../services/api";
import formatPrice from "../utils/formatPrice";

const PERKS = [
  { icon: "🚚", label: "Free express delivery" },
  { icon: "↺", label: "7-day easy returns" },
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
    <div className="flex flex-col gap-8">
      <Link
        to="/products"
        className="w-fit animate-fade-up text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400 transition hover:text-gold-300"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative animate-fade-up">
          <div className="absolute -inset-6 bg-gold-500/10 blur-3xl" />
          <div className="gold-frame relative p-px">
            <div className="product-stage group aspect-square">
              <Corners />
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-12 transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="flex animate-fade-up flex-col gap-6 [animation-delay:120ms]">
          <span className="w-fit border border-gold-500/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">
            {product.category}
          </span>
          <h1 className="font-display text-5xl font-semibold leading-[1.1] text-ivory">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-5 border-y border-gold-500/15 py-5">
            <p className="text-gold font-display text-4xl font-semibold">{formatPrice(product.price)}</p>
            <StockBadge stock={product.stock} />
          </div>
          <p className="text-base leading-relaxed text-stone-400">{product.description}</p>

          <div className="grid grid-cols-3 gap-px border border-gold-500/15 bg-gold-500/15">
            {PERKS.map((perk) => (
              <div key={perk.label} className="bg-ink-900 p-4 text-center">
                <span className="text-lg text-gold-300">{perk.icon}</span>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-stone-400">{perk.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:max-w-md">
            <AddToCartButton product={product} />
            <WishlistButton productId={product._id} initialSaved={inWishlist} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
