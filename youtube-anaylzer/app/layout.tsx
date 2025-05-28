'use client';
import React from "react";
import { motion } from "framer-motion";
import { Video, LogIn, UserPlus } from "lucide-react";
import "./globals.css";
import { useRouter } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-white to-red-100 text-red-900">
        {/* Sticky Navbar */}
        <header className="top-0 sticky z-50 bg-white shadow-xl border-b-2 border-red-600">
          <div className="w-full px-6 py-4 flex items-center justify-between">
          <div
            onClick={() => router.push('/')}
            className="group relative flex items-center gap-2 text-red-700 font-extrabold text-2xl tracking-tight cursor-pointer"
          >
            <span className="relative">
              QuickTube AI
              <motion.span
                layoutId="underline"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              />
            </span>
          </div>

            <div className="space-x-3 flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onClick={() => router.push('/login')}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
              >
                <LogIn className="w-4 h-4" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => router.push('/signup')}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-medium"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow">{children}</main>

      </body>
    </html>
  );
};

export default Layout;
