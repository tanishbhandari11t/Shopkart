import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../services/api";
import { CartProvider } from "../context/CartContext.jsx";
import AuroraBackground from "./AuroraBackground.jsx";
import Navbar from "./Navbar.jsx";
import StatusMessage from "./StatusMessage.jsx";

function ProtectedRoute() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    getMe()
      .then(({ data }) => {
        if (!ignore) {
          setUser(data);
          setStatus("authenticated");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("unauthenticated");
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <>
        <AuroraBackground />
        <StatusMessage type="loading" title="Checking your session..." />
      </>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return (
    <CartProvider>
      <AuroraBackground />
      <Navbar user={user} />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-10">
        <Outlet context={{ user }} />
      </main>
    </CartProvider>
  );
}

export default ProtectedRoute;
