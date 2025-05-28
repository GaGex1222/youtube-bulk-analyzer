'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Rocket } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl text-center"
      >
        <h1 className="text-5xl font-extrabold mb-6">Buy Credits</h1>
        <p className="text-xl text-red-800 mb-14 max-w-2xl mx-auto">
          Choose the AI summarizer that fits your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GPT-3.5 Turbo Plan */}
          <div className="bg-white border border-red-300 rounded-2xl p-8 shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Simple AI</h2>
            <p className="text-red-700 text-lg mb-6">$0.03 / minute (1 credit)</p>
            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Summarize YouTube videos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Bullet-point & short paragraph summaries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Fast & affordable
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="text-red-500" />
                No topic detection or tone analysis
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="text-red-500" />
                No keyword highlighting
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="text-red-500" />
                No export to PDF/Markdown
              </li>
            </ul>
            <button className="mt-auto px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
              Buy 3.5 Credits
            </button>
          </div>

          {/* GPT-4o Plan */}
          <div className="bg-white border-2 border-red-500 rounded-2xl p-8 shadow-xl flex flex-col">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <Rocket className="text-red-600" /> Advanced AI
            </h2>
            <p className="text-red-700 text-lg mb-6">$0.05 / minute (1 credit)</p>
            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                In-depth summarization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Topic detection & tone analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Keyword highlighting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Export to PDF or Markdown
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                Highest accuracy & language quality
              </li>
            </ul>
            <button className="mt-auto px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2 justify-center">
              <Rocket size={16} /> Buy 4o Credits
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingPage;
