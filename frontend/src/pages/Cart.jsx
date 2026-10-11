import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import Corners from "../components/Corners.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { useCart } from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice";

function Cart() {
  const { cartItems, loading, error, totalUnits, subtotal, refreshCart } = useCart();
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const hasStockIssue = cartItems.some((item) => item.quantity > item.product.stock);

  if (loading && cartItems.length === 0) {
    return <StatusMessage type="loading" title="Loading your cart..." />;
  }

  if (error) {
    return (
      <StatusMessage
        type="error"
        icon="⚠️"
        title="Unable to load your cart."
        message={error}
        action={
          <button className="btn-primary" onClick={refreshCart}>
            Try Again
          </button>
        }
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <StatusMessage
        icon="🛒"
        title="Your cart is empty"
        message="Looks like you haven't added anything yet."
        action={
          <Link to="/products" className="btn-primary px-8 py-4">
            Browse Products
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="animate-fade-up border-b border-gold-500/15 pb-8">
        <p className="eyebrow">Almost yours</p>
        <h1 className="mt-3 font-display text-5xl font-semibold text-ivory sm:text-6xl">
          My <span className="text-gold italic">Cart</span>
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="panel animate-fade-up px-8 lg:col-span-2">
          {cartItems.map((item, index) => (
            <CartItem key={item.product._id} item={item} index={index} />
          ))}
        </section>

        <aside className="gold-frame h-fit animate-fade-up p-px [animation-delay:150ms] lg:sticky lg:top-28">
          <div className="group relative bg-ink-900 p-8">
            <Corners />
            <p className="eyebrow">Summary</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ivory">Order Summary</h2>
            <dl className="mt-6 flex flex-col gap-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone-400">Items</dt>
                <dd className="font-medium text-ivory">{totalUnits}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">Products</dt>
                <dd className="font-medium text-ivory">{cartItems.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone-400">Delivery</dt>
                <dd className="font-semibold uppercase tracking-[0.15em] text-emerald-300">Free</dd>
              </div>
              <div className="mt-2 flex items-end justify-between border-t border-gold-500/20 pt-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400">Subtotal</dt>
                <dd className="text-gold font-display text-3xl font-semibold">{formatPrice(subtotal)}</dd>
              </div>
            </dl>

            {hasStockIssue && (
              <p className="mt-5 border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                Some items exceed the available stock. Please update their quantity.
              </p>
            )}

            <button
              className="btn-primary mt-8 w-full py-4"
              disabled={hasStockIssue}
              onClick={() => setCheckoutNotice(true)}
            >
              Proceed to Checkout →
            </button>
            {checkoutNotice && (
              <p className="mt-3 animate-fade-up text-center text-xs text-stone-400">
                Checkout is coming in the next lab 🚀
              </p>
            )}
            <Link
              to="/products"
              className="mt-5 block text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400 transition hover:text-gold-300"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
