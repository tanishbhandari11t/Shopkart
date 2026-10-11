import { Link, useOutletContext } from "react-router-dom";
import SpotlightCard from "../components/SpotlightCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice";

const CATEGORY_TILES = [
  { name: "Electronics", emoji: "⚡", glow: "from-violet-500/30" },
  { name: "Fashion", emoji: "👟", glow: "from-pink-500/30" },
  { name: "Books", emoji: "📚", glow: "from-amber-500/30" },
  { name: "Home", emoji: "🛋️", glow: "from-cyan-500/30" },
];

const FLOATING = [
  { emoji: "🎧", className: "right-[30%] top-6", tilt: "-8deg", delay: "0s" },
  { emoji: "⌨️", className: "right-[6%] top-12", tilt: "10deg", delay: "-1.5s" },
  { emoji: "👟", className: "right-[20%] bottom-6", tilt: "6deg", delay: "-3s" },
  { emoji: "📚", className: "right-[4%] bottom-10", tilt: "-6deg", delay: "-4.5s" },
];

function Home() {
  const { user } = useOutletContext();
  const { totalUnits, subtotal, cartItems } = useCart();

  const initials = user.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    { label: "Items in cart", value: totalUnits },
    { label: "Cart value", value: formatPrice(subtotal) },
    { label: "Unique products", value: cartItems.length },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="gradient-border animate-fade-up rounded-[2rem] p-px">
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#0c0916]/90 p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />

          {FLOATING.map((item) => (
            <span
              key={item.emoji}
              className={`glass absolute hidden h-16 w-16 animate-float items-center justify-center rounded-2xl text-3xl shadow-2xl lg:flex ${item.className}`}
              style={{ "--tilt": item.tilt, animationDelay: item.delay }}
            >
              {item.emoji}
            </span>
          ))}

          <div className="relative max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Welcome back
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
              Hello, <span className="text-gradient">{user.fullName.split(" ")[0]}</span>! 👋
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Your next favourite thing is one click away. Explore fresh drops, save what you love and check out in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary px-6 py-3 text-base">
                Start Shopping →
              </Link>
              <Link to="/wishlist" className="btn-outline px-6 py-3 text-base">
                ♥ My Wishlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <SpotlightCard
            key={stat.label}
            className="glass animate-fade-up rounded-3xl p-6"
            style={{ animationDelay: `${150 + i * 80}ms` }}
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-white">{stat.value}</p>
          </SpotlightCard>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <SpotlightCard
          as="section"
          className="glass animate-fade-up rounded-3xl p-6 [animation-delay:300ms] lg:col-span-2"
        >
          <h2 className="font-display text-xl font-semibold text-white">My Profile</h2>
          <div className="mt-6 flex items-center gap-5">
            <div className="relative">
              <div className="absolute -inset-1 animate-[spin_5s_linear_infinite] rounded-full bg-[conic-gradient(#8b5cf6,#ec4899,#f97316,#8b5cf6)] blur-[2px]" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#0c0916] font-display text-2xl font-bold text-white">
                {initials}
              </div>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">{user.fullName}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2.5 py-0.5 text-xs font-medium text-fuchsia-300">
                ✦ ShopKart Member
              </p>
            </div>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <dt className="text-xs uppercase tracking-wider text-slate-500">Email</dt>
              <dd className="mt-1 break-all font-medium text-white">{user.email}</dd>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <dt className="text-xs uppercase tracking-wider text-slate-500">Phone Number</dt>
              <dd className="mt-1 font-medium text-white">{user.phone}</dd>
            </div>
          </dl>
        </SpotlightCard>

        <SpotlightCard as="section" className="glass animate-fade-up rounded-3xl p-6 [animation-delay:380ms]">
          <h2 className="font-display text-xl font-semibold text-white">Shop by Category</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.name}
                to={`/products?category=${tile.name}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${tile.glow} to-transparent p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25`}
              >
                <span className="block text-3xl transition duration-300 group-hover:scale-125">{tile.emoji}</span>
                <span className="mt-3 block text-sm font-semibold text-white">{tile.name}</span>
              </Link>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export default Home;
