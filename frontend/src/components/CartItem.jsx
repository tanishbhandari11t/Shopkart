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
      className="group flex animate-fade-up flex-col gap-5 border-b border-gold-500/10 py-6 last:border-b-0 sm:flex-row"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link
        to={`/products/${product._id}`}
        className="product-stage h-32 w-full shrink-0 border border-gold-500/20 sm:w-40"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-3 transition duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to={`/products/${product._id}`}
              className="font-display text-xl font-semibold text-ivory transition hover:text-gold-300"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-stone-500">{formatPrice(product.price)} each</p>
          </div>
          <p className="text-xl font-semibold text-gold-300">{formatPrice(product.price * quantity)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center border border-gold-500/30">
            <button
              type="button"
              onClick={decrease}
              disabled={pending || quantity <= 1}
              className="flex h-10 w-10 items-center justify-center text-lg text-ivory transition hover:bg-gold-500/15 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              key={quantity}
              className="flex h-10 min-w-12 animate-pop items-center justify-center border-x border-gold-500/30 font-semibold text-ivory"
            >
              {pending ? "…" : quantity}
            </span>
            <button
              type="button"
              onClick={increase}
              disabled={pending || quantity >= product.stock}
              className="flex h-10 w-10 items-center justify-center text-lg text-ivory transition hover:bg-gold-500/15 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300 underline-offset-4 transition hover:underline disabled:opacity-50"
          >
            Remove
          </button>

          {quantity > product.stock ? (
            <span className="text-xs text-red-400">
              Only {product.stock} in stock now — please reduce quantity
            </span>
          ) : (
            quantity === product.stock && (
              <span className="text-xs text-gold-400">Only {product.stock} in stock</span>
            )
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export default CartItem;
