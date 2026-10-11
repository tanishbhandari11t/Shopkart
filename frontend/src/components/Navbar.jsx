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
        `relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition duration-300 ${
          isActive
            ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      {label}
      {count !== undefined && count !== null && (
        <span
          key={count}
          className="inline-flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-1.5 text-[11px] font-bold text-white shadow-[0_0_14px_rgb(236_72_153/0.7)]"
        >
          {count}
        </span>
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
    <header className="sticky top-0 z-30 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)]">
        <Link to="/home" aria-label="ShopKart home">
          <Logo size={36} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">{links}</div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white ring-2 ring-white/10">
              {initials}
            </span>
            <span className="text-sm text-slate-300">{user?.fullName?.split(" ")[0]}</span>
          </div>
          <button onClick={handleLogout} disabled={loggingOut} className="btn-outline py-2">
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
        <div className="glass mx-auto mt-2 flex max-w-6xl animate-fade-up flex-col gap-1 rounded-2xl p-3 md:hidden">
          {links}
          <button onClick={handleLogout} disabled={loggingOut} className="btn-outline mt-2">
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
