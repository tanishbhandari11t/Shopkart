import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { getWishlist, logoutCustomer, WISHLIST_CHANGED_EVENT } from "../services/api";
import Logo from "./Logo.jsx";

function NavItem({ to, label, count, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition duration-300 ${
          isActive ? "text-gold-300" : "text-stone-400 hover:text-ivory"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {count !== undefined && count !== null && (
            <span
              key={count}
              className="inline-flex h-5 min-w-5 animate-pop items-center justify-center bg-gold-500 px-1.5 text-[10px] font-bold tracking-normal text-ink-950"
            >
              {count}
            </span>
          )}
          <span
            className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function Navbar({ user }) {
  const navigate = useNavigate();
  const { totalUnits } = useCart();
  const [wishlistCount, setWishlistCount] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadWishlistCount = () =>
      getWishlist()
        .then(({ data }) => setWishlistCount(data.count))
        .catch(() => setWishlistCount(null));

    loadWishlistCount();
    window.addEventListener(WISHLIST_CHANGED_EVENT, loadWishlistCount);
    return () => window.removeEventListener(WISHLIST_CHANGED_EVENT, loadWishlistCount);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutCustomer();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const initials = user?.fullName?.trim().charAt(0).toUpperCase() || "?";

  const links = (
    <>
      <NavItem to="/home" label="Home" onClick={closeMenu} />
      <NavItem to="/products" label="Products" onClick={closeMenu} />
      <NavItem to="/wishlist" label="Wishlist" count={wishlistCount} onClick={closeMenu} />
      <NavItem to="/cart" label="Cart" count={totalUnits} onClick={closeMenu} />
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-gold-500/15 bg-ink-950/75 backdrop-blur-xl">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/home" aria-label="ShopKart home">
          <Logo size={34} />
        </Link>

        <div className="hidden items-center gap-2 md:flex">{links}</div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-gold-500/50 bg-gold-500/10 font-display text-sm font-semibold text-gold-300">
              {initials}
            </span>
            <span className="text-sm text-stone-300">{user?.fullName?.split(" ")[0]}</span>
          </div>
          <button onClick={handleLogout} disabled={loggingOut} className="btn-outline px-4 py-2">
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <button
          className="btn-outline px-3 py-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="flex animate-fade-up flex-col gap-1 border-t border-gold-500/15 px-6 py-4 md:hidden">
          {links}
          <button onClick={handleLogout} disabled={loggingOut} className="btn-outline mt-3">
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
