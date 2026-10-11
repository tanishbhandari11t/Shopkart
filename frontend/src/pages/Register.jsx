import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { getErrorMessage, registerCustomer } from "../services/api";

const initialForm = { fullName: "", email: "", password: "", phone: "" };

const validate = ({ fullName, email, password, phone }) => {
  const errors = {};
  if (!fullName.trim()) errors.fullName = "Full name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email";
  if (!password) errors.password = "Password is required";
  else if (password.length < 6) errors.password = "Password must contain at least 6 characters";
  if (!phone.trim()) errors.phone = "Phone number is required";
  else if (!/^\d{10}$/.test(phone.trim())) errors.phone = "Enter a valid 10-digit phone number";
  return errors;
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await registerCustomer(form);
      navigate("/login", { state: { registered: true, email: form.email } });
    } catch (err) {
      setServerError(getErrorMessage(err, "Registration failed. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join ShopKart and start shopping in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-gold-300 underline-offset-4 hover:text-gold-200 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <div className="animate-fade-up border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {serverError}
          </div>
        )}
        <FormField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Doe"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          placeholder="john@gmail.com"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          placeholder="At least 6 characters"
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="9876543210"
        />
        <button type="submit" disabled={submitting} className="btn-primary mt-3 py-4">
          {submitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
