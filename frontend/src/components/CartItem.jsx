import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice";

function CartItem({ item, index = 0 }) {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart, isPending } = useCart();
  const [error, setError] = useState("");

  const pending = isPending(product._id);

  const handleResult = (result) => setError(result.ok ? "" : result.message);

  // If stock dropped below the saved quantity, jump straight down to what is available
  const decrease = async () =>
    handleResult(await updateQuantity(product._id, Math.min(quantity - 1, product.stock)));
  const increase = async () => handleResult(await updateQuantity(product._id, quantity + 1));
  const remove = async () => handleResult(await removeFromCart(product._id));

  return (
    <div
      className="group flex animate-fade-up flex-col gap-4 border-b border-white/5 py-5 last:border-b-0 sm:flex-row"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link
        to={`/products/${product._id}`}
        className="h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 sm:w-36"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to={`/products/${product._id}`}
              className="font-display text-lg font-semibold text-white transition hover:text-fuchsia-300"
            >
              {product.name}
            </Link>
            <p className="text-sm text-slate-400">{formatPrice(product.price)} each</p>
          </div>
          <p className="font-display text-xl font-bold text-white">
            {formatPrice(product.price * quantity)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={decrease}
              disabled={pending || quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span key={quantity} className="min-w-10 animate-pop text-center font-display font-bold text-white">
              {pending ? "…" : quantity}
            </span>
            <button
              type="button"
              onClick={increase}
              disabled={pending || quantity >= product.stock}
              className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            Remove
          </button>

          {quantity > product.stock ? (
            <span className="text-xs text-red-400">
              Only {product.stock} in stock now — please reduce quantity
            </span>
          ) : (
            quantity === product.stock && (
              <span className="text-xs text-amber-300">Only {product.stock} in stock</span>
            )
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export default CartItem;
