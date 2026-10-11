import AuroraBackground from "./AuroraBackground.jsx";
import Corners from "./Corners.jsx";
import Logo from "./Logo.jsx";

const FLOATING_ITEMS = [
  {
    name: "AirPods Max",
    price: "₹59,900",
    image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
    position: "right-10 top-[14%]",
    tilt: "4deg",
    delay: "0s",
  },
  {
    name: "Submariner",
    price: "₹8,95,000",
    image: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp",
    position: "right-6 bottom-[12%]",
    tilt: "-3deg",
    delay: "-3s",
  },
];

const STATS = [
  { value: "22+", label: "Curated products" },
  { value: "4", label: "Collections" },
  { value: "24h", label: "Express delivery" },
];

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <AuroraBackground />

      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-gold-500/15 p-14 lg:flex">
        <Logo size={40} />

        <div className="relative z-10 max-w-md animate-fade-up xl:max-w-[26rem] 2xl:max-w-lg">
          <p className="eyebrow">The Premium Collection</p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.1] text-ivory 2xl:text-6xl">
            Luxury, <span className="text-gold italic">delivered</span>
            <br />
            to your door.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-400">
            Hand-picked electronics, fashion, books and home essentials — with a wishlist that remembers and a cart
            that keeps up.
          </p>
          <div className="mt-10 flex gap-8 border-t border-gold-500/15 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-gold-300">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {FLOATING_ITEMS.map((item) => (
          <div
            key={item.name}
            className={`panel group absolute ${item.position} hidden w-36 animate-float xl:block`}
            style={{ "--tilt": item.tilt, animationDelay: item.delay }}
          >
            <Corners />
            <div className="product-stage aspect-square">
              <img src={item.image} alt={item.name} className="h-full w-full object-contain p-4" />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-sm font-medium text-ivory">{item.name}</p>
              <p className="text-xs text-gold-400">{item.price}</p>
            </div>
          </div>
        ))}

        <p className="relative z-10 text-xs uppercase tracking-[0.25em] text-stone-600">
          © 2026 ShopKart · Built on the MERN stack
        </p>
      </aside>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-10 flex justify-center lg:hidden">
            <Logo size={40} />
          </div>
          <div className="gold-frame p-px shadow-[0_30px_80px_-30px_rgb(201_162_74/0.45)]">
            <div className="group relative bg-ink-900 p-10">
              <Corners />
              <p className="eyebrow">ShopKart Account</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-ivory">{title}</h2>
              <p className="mt-2 text-sm text-stone-400">{subtitle}</p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-stone-400">{footer}</p>
        </div>
      </section>
    </div>
  );
}

export default AuthLayout;
