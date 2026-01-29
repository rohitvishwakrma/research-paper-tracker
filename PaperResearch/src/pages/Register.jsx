import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import { signupUser } from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signupUser({ email: formData.email, password: formData.password });
      navigate("/login");
    } catch (err) {
      if (err.message && (err.message.includes('User already exists') || err.message.includes('409'))) {
        setError('This email is already registered. Please log in instead.');
      } else {
        setError(err.message || 'Signup failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1026] via-[#181e3a] to-[#1a1440]">
      <div
        className="w-full max-w-xl p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/10 relative flex flex-col items-center"
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-8 w-full">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-xl">
            <FaBuilding className="text-white text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg w-full">
          Sign Up
        </h1>
        <p className="text-center text-lg text-slate-300 mt-2 mb-8 w-full">
          Create your account to start onboarding
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-inner"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition shadow-lg mt-2"
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-base text-slate-300 mt-8 w-full">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            Login
          </Link>
        </p>

        {/* Version */}
        <p className="text-center text-xs text-slate-500 mt-8 w-full">
          Employee Onboarding Manager v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Register;
