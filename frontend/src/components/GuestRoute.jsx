import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../services/api";
import AuroraBackground from "./AuroraBackground.jsx";
import StatusMessage from "./StatusMessage.jsx";

// Login / Register are only for logged-out visitors
function GuestRoute() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    getMe()
      .then(() => !ignore && setStatus("authenticated"))
      .catch(() => !ignore && setStatus("guest"));

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

  if (status === "authenticated") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
