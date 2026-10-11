import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { getErrorMessage, loginCustomer } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  const [form, setForm] = useState({ email: location.state?.email || "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setSubmitting(true);
    try {
      await loginCustomer(form);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid Credentials"
          : getErrorMessage(err, "Unable to log in. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue shopping."
      footer={
        <>
          New to ShopKart?{" "}
          <Link to="/register" className="font-semibold text-fuchsia-300 hover:text-fuchsia-200">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {justRegistered && !error && (
          <div className="animate-fade-up rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
            ✓ Account created successfully. Please log in.
          </div>
        )}
        {error && (
          <div className="animate-fade-up rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </div>
        )}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="john@gmail.com"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          placeholder="Your password"
        />
        <button type="submit" disabled={submitting} className="btn-primary mt-2 py-3">
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
