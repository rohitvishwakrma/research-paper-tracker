
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import { loginUser, signupUser } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (err) {
      // If user not found, try to register then login
      if (err.message && (err.message.includes('Invalid credentials') || err.message.includes('not found') || err.message.includes('401'))) {
        try {
          await signupUser(formData);
          // After successful signup, login
          await loginUser(formData);
          navigate("/dashboard");
        } catch (signupErr) {
          if (signupErr.message && (signupErr.message.includes('User already exists') || signupErr.message.includes('409'))) {
            setError('This email is already registered. Please log in instead.');
          } else if (signupErr.message && signupErr.message.includes('Signup failed')) {
            setError('Registration failed. Please try again.');
          } else {
            setError('Account not found.\nIt looks like you don\u2019t have an account yet.\nPlease register first, and then log in again to access your account.');
          }
        }
      } else {
        if (err.message && err.message.includes('401')) {
          setError('Incorrect email or password. Please try again or register if you don\'t have an account.');
        } else {
          setError(err.message || 'Login failed');
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0a1026] via-[#181e3a] to-[#1a1440]">
      <div className="login-form flex flex-col items-center justify-center w-full" style={{ minHeight: '520px' }}>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          {/* Email */}
          <div className="login-group relative">
            <label htmlFor="email">Email</label>
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-2xl" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-14 pr-4 py-5"
            />
          </div>

          {/* Password */}
          <div className="login-group relative">
            <label htmlFor="password">Password</label>
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-2xl " />
            
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-14 pr-14 py-5 mb-9"
            />
            <br />
             
            <button
              type="button"
              name="showPassword"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-2xl focus:outline-none hover:text-slate-600 transition-colors"
              tabIndex={-1}
            ><label htmlFor="password">showPassword</label>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Sign In Button */}
          <div className="login-actions">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl font-bold text-white text-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-xl"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-slate-300 text-base mt-8 text-center">
          Need an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline font-medium hover:text-blue-300 transition-colors">
            Register here
          </Link>
        </p>

        {/* Footer */}
        <p className="text-slate-500 text-xs mt-8 text-center">
         PaperResearcher Publishing v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Login;