import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= GOOGLE OAUTH CALLBACK FIX ================= */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Store token & let AuthContext fetch user
      login(null, token);
      toast.success("Logged in with Google 🎉");
      navigate("/", { replace: true });
    }
  }, [location.search, login, navigate]);

  /* ================= HELPERS ================= */
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  /* ================= EMAIL / PASSWORD LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password)
      newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await loginService(formData);

      // 🔥 UNIVERSAL RESPONSE HANDLING
      const token =
        response?.token ||
        response?.data?.token ||
        response?.accessToken;

      const user =
        response?.user ||
        response?.data?.user ||
        null;

      if (!token) throw new Error("Token missing");

      login(user, token);
      createConfetti();

      toast.success("Login successful 🎉");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CONFETTI EFFECT ================= */
  const createConfetti = () => {
    for (let i = 0; i < 100; i++) {
      const c = document.createElement("div");
      c.className = "blockbuster-confetti";
      c.style.left = Math.random() * window.innerWidth + "px";
      c.style.background =
        ["#000", "#dc2626", "#ef4444"][
          Math.floor(Math.random() * 3)
        ];
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = () => {
    const api =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const base = api.replace("/api", "");
    window.location.href = `${base}/api/auth/google`;
  };

  /* ================= JSX ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 🌿
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl border"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-xl border pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((p) => !p)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password}
            </p>
          )}

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center text-gray-500">
            OR
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border py-3 rounded-xl font-semibold"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
