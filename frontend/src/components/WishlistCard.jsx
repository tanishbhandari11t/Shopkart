import { useState } from "react";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import AddToCartButton from "./AddToCartButton.jsx";
import Corners from "./Corners.jsx";
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
      className={`panel group flex animate-fade-up flex-col transition duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_30px_60px_-25px_rgb(201_162_74/0.35)] ${
        removing ? "scale-95 opacity-50" : ""
      }`}
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      <Corners />
      <Link to={`/products/${product._id}`} className="product-stage aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-0 top-0 bg-ink-950 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-300">
          {product.category}
        </span>
        <span className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center bg-gold-500 text-sm text-ink-950">
          ♥
        </span>
      </Link>

      <div className="relative z-10 flex flex-1 flex-col gap-3 border-t border-gold-500/15 p-5">
        <h3 className="line-clamp-1 font-display text-xl font-semibold text-ivory">{product.name}</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-semibold tracking-tight text-gold-300">{formatPrice(product.price)}</p>
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
            className="border border-red-400/30 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300 transition duration-300 hover:border-red-400/60 hover:bg-red-500/10 disabled:opacity-60"
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
