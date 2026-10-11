import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
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
          <Link to="/products" className="btn-primary px-6 py-3">
            Browse Products
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="animate-fade-up">
        <p className="text-sm font-medium uppercase tracking-widest text-fuchsia-300">Almost yours</p>
        <h1 className="mt-1 font-display text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-gradient">Cart</span>
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="glass animate-fade-up rounded-3xl px-6 lg:col-span-2">
          {cartItems.map((item, index) => (
            <CartItem key={item.product._id} item={item} index={index} />
          ))}
        </section>

        <aside className="gradient-border h-fit animate-fade-up rounded-3xl p-px [animation-delay:150ms] lg:sticky lg:top-28">
          <div className="rounded-[calc(1.5rem-1px)] bg-[#0c0916]/95 p-6 backdrop-blur-xl">
            <h2 className="font-display text-xl font-semibold text-white">Order Summary</h2>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Items</dt>
                <dd className="font-medium text-white">{totalUnits}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Products</dt>
                <dd className="font-medium text-white">{cartItems.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Delivery</dt>
                <dd className="font-medium text-emerald-300">FREE</dd>
              </div>
              <div className="mt-2 flex items-end justify-between border-t border-white/10 pt-4">
                <dt className="font-semibold text-white">Subtotal</dt>
                <dd className="text-gradient font-display text-3xl font-bold">{formatPrice(subtotal)}</dd>
              </div>
            </dl>

            {hasStockIssue && (
              <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                Some items exceed the available stock. Please update their quantity.
              </p>
            )}

            <button
              className="btn-primary mt-6 w-full py-3.5 text-base"
              disabled={hasStockIssue}
              onClick={() => setCheckoutNotice(true)}
            >
              Proceed to Checkout →
            </button>
            {checkoutNotice && (
              <p className="mt-3 animate-fade-up text-center text-xs text-slate-400">
                Checkout is coming in the next lab 🚀
              </p>
            )}
            <Link
              to="/products"
              className="mt-4 block text-center text-sm font-medium text-slate-400 transition hover:text-fuchsia-300"
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
