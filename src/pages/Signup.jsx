import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  /* ---------------- SUBMIT (NETWORK SAFE) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (!formData.terms) {
      toast.error("Please accept terms & conditions");
      return;
    }

    setLoading(true);
    try {
      console.log("Signup request →", API_URL + "/auth/register");

      const res = await axios.post(
        `${API_URL}/auth/register`,
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 🔥 prevents silent network fail
          withCredentials: true,
        }
      );

      console.log("Signup response →", res.data);

      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.data?.token;

      const user =
        res.data?.user ||
        res.data?.data?.user ||
        null;

      if (!token) {
        throw new Error("Token missing from response");
      }

      login(user, token);
      setShowSuccess(true);
      toast.success("Account created successfully 🎉");

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error("Signup error →", err);

      if (err.code === "ECONNABORTED") {
        toast.error("Server timeout. Try again.");
      } else if (!err.response) {
        toast.error(
          "Cannot connect to server. Is backend running?"
        );
      } else {
        toast.error(
          err.response.data?.message ||
            "Signup failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GOOGLE SIGNUP ---------------- */
  const handleGoogleSignup = () => {
    const base = API_URL.replace("/api", "");
    window.location.href = `${base}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 px-4">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white p-10 rounded-3xl shadow-2xl text-center"
            >
              <h2 className="text-3xl font-bold mb-2">
                🎉 Account Created
              </h2>
              <p className="text-gray-600">
                Redirecting...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🌿
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <label className="flex text-sm">
            <input
              type="checkbox"
              name="terms"
              onChange={handleChange}
              className="mr-2"
            />
            I agree to Terms & Conditions
          </label>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <div className="text-center text-gray-500">
            OR
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border py-3 rounded-xl font-semibold"
          >
            Sign up with Google
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
