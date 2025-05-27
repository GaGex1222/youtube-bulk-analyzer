'use client'
import React from "react";
import { motion } from "framer-motion";
import "./globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900">
          {/* Top Taskbar */}
          <div className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-md border-b-2 border-red-600">
            <div className="text-xl font-bold tracking-tight text-red-700">
              🎥 YouTube AI Summarizer
            </div>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition">
                Login
              </button>
              <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                Sign Up
              </button>
            </div>
          </div>

          {/* Animate the page content */}
          <motion.div
            key="page-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
