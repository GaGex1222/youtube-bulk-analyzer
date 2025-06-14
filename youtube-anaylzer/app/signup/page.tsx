'use client';

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // New error message state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on submit

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data)
        setErrorMessage(data.error || "Signup failed.");
        return;
      }

      const data = await res.json()
      localStorage.setItem("authToken", data.token)

      setTimeout(() => {
        window.location.href = "/"
      }, 500);
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

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

        <h2 className="text-4xl font-extrabold text-red-700 mb-6">Join Us!</h2>
        <p className="text-red-800 mb-8">Create your account to start summarizing YouTube videos.</p>

        {/* Error message display */}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold border border-red-400 rounded-md p-2 bg-red-100">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-red-500 focus:outline-none transition placeholder-red-400 text-red-800"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-red-500 focus:outline-none transition placeholder-red-400 text-red-800"
              required
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

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-red-500 focus:outline-none transition placeholder-red-400 text-red-800"
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Sign Up
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-red-800"
        >
          <p>
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-red-700 font-bold hover:underline"
            >
              Login
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
