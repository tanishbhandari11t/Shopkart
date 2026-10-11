import { Link, useOutletContext } from "react-router-dom";
import Corners from "../components/Corners.jsx";
import SpotlightCard from "../components/SpotlightCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice";

const CATEGORY_TILES = [
  {
    name: "Electronics",
    image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  },
  {
    name: "Fashion",
    image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
  },
  { name: "Books", image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { name: "Home", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp" },
];

const HERO_IMAGE = "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp";

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
    <div className="flex flex-col gap-10">
      <section className="gold-frame animate-fade-up p-px">
        <div className="group relative grid overflow-hidden bg-ink-900 lg:grid-cols-[1.3fr_1fr]">
          <Corners />
          <div className="relative p-10 sm:p-14">
            <p className="eyebrow">Welcome back</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-ivory sm:text-6xl">
              Hello, <span className="text-gold italic">{user.fullName.split(" ")[0]}</span>.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-400">
              Discover this season's curated collection — iconic timepieces, flagship tech and timeless essentials,
              hand-picked for you.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary px-8 py-4">
                Explore Collection →
              </Link>
              <Link to="/wishlist" className="btn-outline px-8 py-4">
                ♥ My Wishlist
              </Link>
            </div>
          </div>

          <div className="product-stage hidden min-h-80 lg:block">
            <img
              src={HERO_IMAGE}
              alt="Rolex Submariner"
              className="absolute inset-0 h-full w-full animate-float object-contain p-10"
            />
            <div className="absolute bottom-0 left-0 bg-ink-950 px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">Featured</p>
              <p className="font-display text-lg text-ivory">Rolex Submariner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-px border border-gold-500/15 bg-gold-500/15 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <SpotlightCard
            key={stat.label}
            className="animate-fade-up bg-ink-900 p-8"
            style={{ animationDelay: `${150 + i * 80}ms` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-500">{stat.label}</p>
            <p className="mt-3 font-display text-4xl font-semibold text-gold-300">{stat.value}</p>
          </SpotlightCard>
        ))}
      </section>

      <section className="animate-fade-up [animation-delay:250ms]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Collections</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ivory">Shop by Category</h2>
          </div>
          <Link to="/products" className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 hover:text-gold-200">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.name}
              to={`/products?category=${tile.name}`}
              className="group relative block border border-gold-500/15 transition duration-500 hover:-translate-y-1 hover:border-gold-500/50"
            >
              <Corners />
              <div className="product-stage aspect-square">
                <img
                  src={tile.image}
                  alt={tile.name}
                  className="h-full w-full object-contain p-8 transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between bg-ink-900 px-5 py-4">
                <span className="font-display text-lg text-ivory">{tile.name}</span>
                <span className="text-gold-400 transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SpotlightCard as="section" className="panel group animate-fade-up p-8 [animation-delay:350ms]">
        <Corners />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center border border-gold-500/60 bg-gold-500/10 font-display text-3xl font-semibold text-gold-300">
              {initials}
            </div>
            <div>
              <p className="eyebrow">My Profile</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ivory">{user.fullName}</p>
            </div>
          </div>
          <dl className="grid gap-px border border-gold-500/15 bg-gold-500/15 sm:grid-cols-2 md:min-w-[28rem]">
            <div className="bg-ink-900 p-5">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-stone-500">Email</dt>
              <dd className="mt-1.5 break-all text-ivory">{user.email}</dd>
            </div>
            <div className="bg-ink-900 p-5">
              <dt className="text-[10px] uppercase tracking-[0.25em] text-stone-500">Phone Number</dt>
              <dd className="mt-1.5 text-ivory">{user.phone}</dd>
            </div>
          </dl>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default Home;
