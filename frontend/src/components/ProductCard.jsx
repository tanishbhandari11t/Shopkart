import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import AddToCartButton from "./AddToCartButton.jsx";
import SpotlightCard from "./SpotlightCard.jsx";
import StockBadge from "./StockBadge.jsx";
import WishlistButton from "./WishlistButton.jsx";

function ProductCard({ product, inWishlist, index = 0 }) {
  return (
    <SpotlightCard
      as="article"
      className="glass group flex animate-fade-up flex-col overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgb(192_38_211/0.45)]"
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      <Link to={`/products/${product._id}`} className="relative m-2 block aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
          <WishlistButton productId={product._id} initialSaved={inWishlist} />
          <Link to={`/products/${product._id}`} className="btn-outline">
            View Details →
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default ProductCard;
