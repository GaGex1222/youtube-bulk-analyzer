'use client'
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Clock, UserCheck, BookOpen, Star, CheckCircle2 } from "lucide-react";

const FrontPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        {/* Logo */}
        <div className="mb-12 flex items-center justify-center bg-red-600 rounded-3xl w-24 h-14 mx-auto shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-10 h-10 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Unlock Instant <span className="text-red-700">YouTube Video Summaries</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-red-800 mb-10 max-w-3xl mx-auto">
          Paste your YouTube links and get clear, AI-powered summaries in seconds using the latest GPT technology. Perfect for students, professionals, and content creators.
        </p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <div className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <Clock className="text-red-600 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Save Time</h3>
            <p>Get video summaries in seconds instead of hours of watching.</p>
          </div>

          <div className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <UserCheck className="text-red-600 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">User-Friendly</h3>
            <p>Easy to use interface designed for all skill levels.</p>
          </div>

          <div className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <BookOpen className="text-red-600 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Educational</h3>
            <p>Perfect for students and professionals to learn faster.</p>
          </div>
        </motion.div>

        {/* What You Get Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <div className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">AI-Powered Summaries</h3>
            <p>Advanced GPT tech to create clear, concise summaries.</p>
          </div>

          <div className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Multiple Videos</h3>
            <p>Analyze up to 10 YouTube links at once, saving you even more time.</p>
          </div>

          <div className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center">
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Reliable & Fast</h3>
            <p>Powered by OpenAI Whisper & GPT models for accuracy and speed.</p>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() => router.push("analyze")}
            className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition"
          >
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-600 hover:text-white transition">
            Learn More
          </button>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-red-50 border border-red-300 rounded-2xl p-8 shadow-lg text-red-700 italic text-lg">
            <Star className="inline-block mb-2" size={32} />
            “This tool saved me hours of watching videos. The summaries are incredibly accurate and concise!” – <strong>Happy User</strong>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FrontPage;
