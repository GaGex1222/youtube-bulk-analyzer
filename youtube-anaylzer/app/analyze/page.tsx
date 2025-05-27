'use client'
import React from "react";
import { motion } from "framer-motion";

const YouTubeAnalyzerHome: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* YouTube Logo */}
      <div className="mb-10 flex items-center justify-center bg-red-600 rounded-3xl w-20 h-12 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-8 h-8 ml-1"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        Summarize YouTube Videos Instantly
      </h1>
      <p className="text-lg sm:text-xl text-red-800 mb-10 text-center max-w-2xl">
        Paste a YouTube link and get a clear, AI-powered summary using GPT-4o or GPT-3.5 Turbo.
      </p>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-medium text-red-700 mb-2">
          YouTube Links (up to 10, one per line)
        </label>
        <textarea
          placeholder="Paste up to 10 YouTube links, each on a new line"
          className="w-full px-4 py-4 rounded-lg border border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 mb-4 resize-none h-48"
        />
        <button
          className="w-full bg-red-600 hover:bg-red-700  py-3 rounded-lg transition ease-in-out duration-150 hover:-translate-y-1 font-semibold text-white"
        >
          Analyze Videos
        </button>
      </div>

      <p className="text-sm text-red-500 mt-8 text-center">
        Powered by OpenAI Whisper & GPT | Built with ❤️ by You
      </p>
    </motion.div>
  );
};

export default YouTubeAnalyzerHome;
