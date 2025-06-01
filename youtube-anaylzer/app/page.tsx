'use client'
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Clock,
  UserCheck,
  BookOpen,
  Star,
  CheckCircle2,
  Link, // Renamed to LinkIcon to avoid conflict with Next.js Link
  Sparkles,
  Rocket
} from "lucide-react";

const FrontPage: React.FC = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    const token = localStorage.getItem("authToken")
    if(token){
      router.push("/analyze")
    } else {
      router.push('/login')
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl text-center" // This div centers the main content block
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
          Paste your YouTube links and get clear, AI-powered summaries in minutes using the latest AI technology. Perfect for students, professionals, and content creators.
        </p>

        {/* Benefits */}
        <div className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Benefit Card 1: Save Time */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
            >
                <Clock className="text-red-600 mb-4" size={48} />
                <h3 className="font-semibold text-lg mb-2">Save Time</h3>
                <p>Get video summaries in minutes instead of hours of watching.</p>
            </motion.div>

            {/* Benefit Card 2: User-Friendly */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
            >
                <UserCheck className="text-red-600 mb-4" size={48} />
                <h3 className="font-semibold text-lg mb-2">User-Friendly</h3>
                <p>Easy to use interface designed for all skill levels.</p>
            </motion.div>

            {/* Benefit Card 3: Educational */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-red-50 border border-red-300 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
            >
                <BookOpen className="text-red-600 mb-4" size={48} />
                <h3 className="font-semibold text-lg mb-2">Educational</h3>
                <p>Perfect for students and professionals to learn faster.</p>
            </motion.div>
        </div>

        {/* Features */}
        <div className="mb-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Card 1 */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
        >
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">AI-Powered Summaries</h3>
            <p>Advanced AI tech to create clear, concise summaries.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
        >
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Multiple Videos</h3>
            <p>Analyze up to 10 YouTube links at once, saving even more time.</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white border border-red-400 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center"
        >
            <CheckCircle2 className="text-red-700 mb-4" size={48} />
            <h3 className="font-semibold text-lg mb-2">Reliable & Fast</h3>
            <p>Powered by our special models for accuracy and speed.</p>
        </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-24 text-center" // The text-center here applies to inline-level content
        >
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Link className="text-red-600 mb-4 mx-auto" size={40} /> {/* Assuming Link is LinkIcon from Lucide */}
              <h4 className="font-semibold text-lg mb-2">1. Paste Link</h4>
              <p>Paste your YouTube video URL into the input.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Sparkles className="text-red-600 mb-4 mx-auto" size={40} />
              <h4 className="font-semibold text-lg mb-2">2. AI Magic</h4>
              <p>We process the video using Our Special AI</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Star className="text-red-600 mb-4 mx-auto" size={40} />
              <h4 className="font-semibold text-lg mb-2">3. Read Summary</h4>
              <p>Get a clear, useful summary in seconds.</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          // ADD THESE CLASSES TO CENTER THE BUTTON
          className="text-center flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to transform your video watching?</h2>
          <p className="text-red-800 mb-6 text-lg">Join hundreds using AI to boost productivity.</p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition flex items-center gap-2"
          >
            <Rocket size={20} /> Get Started
          </button>
        </motion.div>
        {/* FAQ Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.3, duration: 0.6 }}
  className="mt-24 max-w-4xl mx-auto text-center"
>
  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
  <div className="space-y-6 text-left">
    <div className="bg-white p-5 rounded-2xl shadow-md border border-red-300">
      <h3 className="font-semibold text-lg text-red-700 mb-2">How to use?</h3>
        <p>
            Purchase credits (1 credit = 1 minute of summarization), then use them to summarize videos. See the pricing{' '}
            <a href="/pricing" className="text-red-600 font-semibold hover:underline">
                here
            </a>.
        </p>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow-md border border-red-300">
      <h3 className="font-semibold text-lg text-red-700 mb-2">How long does it take to summarize a video?</h3>
      <p>Usually between 10 to 30 seconds, depending on video length and server load.</p>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow-md border border-red-300">
      <h3 className="font-semibold text-lg text-red-700 mb-2">Can I summarize private or unlisted videos?</h3>
      <p>No, we can only summarize publicly accessible YouTube videos.</p>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow-md border border-red-300">
      <h3 className="font-semibold text-lg text-red-700 mb-2">How accurate are the summaries?</h3>
      <p>We use advanced AI models to provide accurate, concise summaries, but results may vary slightly based on the video content.</p>
    </div>
  </div>
</motion.div>

      </motion.div>
    </div>
  );
};

export default FrontPage;