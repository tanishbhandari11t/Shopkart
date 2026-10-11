import { useState } from "react";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import AddToCartButton from "./AddToCartButton.jsx";
import SpotlightCard from "./SpotlightCard.jsx";
import StockBadge from "./StockBadge.jsx";

function WishlistCard({ product, onRemove, index = 0 }) {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");

  const handleRemove = async () => {
    setRemoving(true);
    setError("");
    const result = await onRemove(product._id);
    if (!result.ok) {
      setError(result.message);
      setRemoving(false);
    }
  };

  return (
    <SpotlightCard
      as="article"
      className={`glass group flex animate-fade-up flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgb(236_72_153/0.45)] ${
        removing ? "scale-95 opacity-50" : ""
      }`}
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      <Link to={`/products/${product._id}`} className="relative m-2 block aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/90 text-white shadow-[0_0_20px_rgb(236_72_153/0.8)]">
          ♥
        </span>
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {product.category}
        </span>
      </Link>

      <div className="relative z-10 flex flex-1 flex-col gap-2 px-5 pb-5 pt-2">
        <h3 className="line-clamp-1 font-display text-lg font-semibold text-white">{product.name}</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-2xl font-bold text-white">{formatPrice(product.price)}</p>
          <StockBadge stock={product.stock} />
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <AddToCartButton product={product} />
          <Link to={`/products/${product._id}`} className="btn-outline">
            View Details →
          </Link>
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="rounded-xl border border-pink-400/30 bg-pink-500/10 px-3 py-2.5 text-sm font-semibold text-pink-300 transition duration-300 hover:bg-pink-500/20 disabled:opacity-60"
          >
            {removing ? "Removing..." : "Remove ♥"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default WishlistCard;
