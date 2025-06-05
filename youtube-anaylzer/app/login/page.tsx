'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginPageProps {
  message?: string
}

const LoginPage: React.FC<LoginPageProps> = ({message}) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // New state for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrorMessage(data.error || "Login failed.");
      return;
    }

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    setTimeout(() => {
      window.location.href = "/"
    }, 500);
  };
  
  // if the page has been loaded with a message show it as an error (Like session has expired)
  useEffect(() => {
    if(message){
      setErrorMessage(message)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-20 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center border-2 border-red-300"
      >
        <div className="mb-8 flex items-center justify-center bg-red-600 rounded-3xl w-24 h-14 mx-auto shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-10 h-10 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-red-700 mb-6">Welcome Back!</h2>
        <p className="text-red-800 mb-8">Sign in to unlock your summaries.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-red-500 focus:outline-none transition placeholder-red-400 text-red-800"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-red-500 focus:outline-none transition placeholder-red-400 text-red-800"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          </div>

          {/* Error message element */}
          {errorMessage && (
            <p className="text-red-600 font-semibold text-sm text-left">{errorMessage}</p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-red-800"
        >
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-red-700 font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
          <p className="mt-2">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-red-700 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
