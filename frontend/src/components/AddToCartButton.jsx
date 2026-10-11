import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
      <path d="M3 4h2l2.4 11h10.2L20 8H6.2" />
      <rect x="8.5" y="18.5" width="2" height="2" />
      <rect x="15.5" y="18.5" width="2" height="2" />
    </svg>
  );
}

function AddToCartButton({ product, className = "" }) {
  const { addToCart, getQuantity, isPending } = useCart();
  const [error, setError] = useState("");

  const quantityInCart = getQuantity(product._id);
  const pending = isPending(product._id);
  const outOfStock = product.stock === 0;
  const reachedStockLimit = !outOfStock && quantityInCart >= product.stock;

  const handleClick = async () => {
    setError("");
    const result = await addToCart(product._id);
    if (!result.ok) setError(result.message);
  };

  let label = "Add to Cart";
  if (pending) label = "Adding...";
  else if (outOfStock) label = "Out of Stock";
  else if (reachedStockLimit) label = "Max in Cart";
  else if (quantityInCart > 0) label = `Add Another (${quantityInCart})`;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending || outOfStock || reachedStockLimit}
        className="btn-primary w-full"
      >
        {pending ? (
          <span className="h-4 w-4 animate-spin border-2 border-ink-950/30 border-t-ink-950" />
        ) : (
          <CartIcon />
        )}
        {label}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default AddToCartButton;
