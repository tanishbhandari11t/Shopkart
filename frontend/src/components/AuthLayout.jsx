import AuroraBackground from "./AuroraBackground.jsx";
import Logo from "./Logo.jsx";

const FLOATING_ITEMS = [
  { emoji: "🎧", name: "Headphones", price: "₹4,999", position: "left-[8%] top-[18%]", tilt: "-6deg", delay: "0s" },
  { emoji: "⌨️", name: "Keyboard", price: "₹2,999", position: "right-[8%] top-[12%]", tilt: "5deg", delay: "-2s" },
  { emoji: "👟", name: "Sneakers", price: "₹3,299", position: "right-[12%] bottom-[16%]", tilt: "4deg", delay: "-4s" },
];

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <AuroraBackground />

      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/5 p-12 lg:flex">
        <Logo size={44} />

        <div className="relative z-10 max-w-md animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            New drops every week
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-white xl:text-5xl">
            Shop the <span className="text-gradient">future</span>,<br />
            <span className="whitespace-nowrap">delivered today ⚡</span>
          </h1>
          <p className="mt-5 text-lg text-slate-400">
            Thousands of products, lightning-fast checkout and a wishlist that never forgets.
          </p>
        </div>

        {FLOATING_ITEMS.map((item) => (
          <div
            key={item.name}
            className={`glass absolute ${item.position} flex animate-float items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl`}
            style={{ "--tilt": item.tilt, animationDelay: item.delay }}
          >
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-xs text-fuchsia-300">{item.price}</p>
            </div>
          </div>
        ))}

        <p className="relative z-10 text-sm text-slate-500">© 2026 ShopKart. Built with the MERN stack.</p>
      </aside>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size={44} />
          </div>
          <div className="gradient-border rounded-3xl p-px shadow-[0_20px_80px_-20px_rgb(192_38_211/0.45)]">
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0c0916]/95 p-8 backdrop-blur-xl">
              <h2 className="font-display text-3xl font-bold text-white">{title}</h2>
              <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
              <div className="mt-7">{children}</div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
        </div>
      </section>
    </div>
  );
}

export default AuthLayout;
