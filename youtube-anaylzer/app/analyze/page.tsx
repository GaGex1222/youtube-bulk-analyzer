'use client'
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BadgeDollarSign,
  Ban,
  Sparkles,
  PlayCircle,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Loader2
} from "lucide-react";
// AnalyzeResults component (unchanged — you already updated it well)
const AnalyzeResults: React.FC<{results: { title: string; credits: number, author: string }[]; onBack: () => void; creditsType: string;}> = ({ results, onBack, creditsType }) => {
  const totalCredits = results.reduce((sum, r) => sum + r.credits, 0);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-4xl font-bold text-center">Summarize Request</h2>
      </div>

      <div className="flex items-center gap-2 text-red-700 text-md mb-10 text-center">
        <Info className="w-4 h-4" />
        <p>
          Credit type: <span className="font-semibold capitalize">{creditsType}</span>
        </p>
      </div>

      <ul className="w-full max-w-2xl space-y-4 mb-8">
        {results.map(({ title, credits, author }, idx) => (
          <li
            key={idx}
            className="p-4 bg-white border border-red-200 rounded-2xl shadow-md flex justify-between items-start"
          >
            <div className="flex flex-col max-w-xs">
              <span className="text-md font-medium">{title}</span>
              <span className="text-sm text-red-500">by {author}</span>
            </div>
            <span className="text-red-700 font-bold">
              {credits} Credit{credits > 1 ? 's' : ''}
            </span>
          </li>
        ))}
      </ul>

      <div className="mb-10 text-xl font-semibold text-red-800 flex items-center gap-2">
        <BadgeDollarSign className="w-5 h-5" />
        Total {creditsType} Credits Will Be Used: <span className="text-red-700">{totalCredits}</span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold flex items-center gap-2 shadow-md"
        >
          <CheckCircle className="w-5 h-5" /> Start Summarizing
        </button>

        <button
          onClick={onBack}
          className="px-6 py-3 bg-white text-red-600 border border-red-300 hover:bg-red-100 transition font-semibold rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Ban className="w-5 h-5" /> Cancel Request
        </button>
      </div>
    </motion.div>
  );
};

const YouTubeAnalyzerHome: React.FC = () => {
  const [videoLinks, setVideoLinks] = useState<string[]>([""]);
  const [selectedCredit, setSelectedCredit] = useState<"Regular" | "Special">("Regular");
  const [regularCredits, setRegularCredits] = useState(null);
  const [specialCredits, setSpecialCredits] = useState(null);
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ title: string; credits: number, author: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const validLinks = videoLinks.filter(link => link.trim() !== '');
    if (validLinks.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/summary-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: validLinks }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze videos");
      }

      const data = await response.json();
      if(data.error){
        setError(data.error)
        return
      }
      setResults(data.results);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push('/');
    }
    const getUserCredits = async () => {
      try {
          const res = await fetch("http://localhost:5000/api/get-credits", { 
              method: 'GET', 
              headers: {
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token}` 
              }
          });


        if (res.status === 401) {
            console.warn("Session expired or invalid token. Redirecting to login.");
            localStorage.removeItem('authToken'); 
            router.push('/login')
            throw new Error('Unauthorized');
        }

          // Parse the JSON response
          const data = await res.json();
          console.log("User Credits:", data);
          setSpecialCredits(data.special_credits)
          setRegularCredits(data.regular_credits)
      } catch (error) {
          console.error("Failed to fetch user credits:", error);
      }
    }
    getUserCredits()
  }, []);

  if (results) {
    return <AnalyzeResults creditsType={selectedCredit} results={results} onBack={() => setResults(null)} />;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo + Headline */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center justify-center bg-red-600 rounded-full w-20 h-20 shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2">
          Turn YouTube Videos into Summaries
        </h1>
        <p className="text-lg text-center text-red-800 max-w-xl">
          Paste up to 10 YouTube links and get short, clear summaries — powered by AI.
        </p>
      </div>

      {/* Input Fields */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-6 mt-4">
        <label className="block text-sm font-medium text-red-700 mb-2">
          YouTube Links (up to 10)
        </label>

      {videoLinks.map((link, index) => (
          <div key={index} className="relative mb-2">
            <input
              type="text"
              value={link}
              onChange={(e) => {
                const updated = [...videoLinks];
                updated[index] = e.target.value;
                setVideoLinks(updated);
              }}
              placeholder={`YouTube Link ${index + 1}`}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              disabled={isAnalyzing}
            />
            {videoLinks.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updated = videoLinks.filter((_, i) => i !== index);
                  setVideoLinks(updated);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-lg font-bold"
                disabled={isAnalyzing}
                style={{ lineHeight: '1' }}
              >
                ×
              </button>
            )}
          </div>
        ))}



        {videoLinks.length < 10 && (
          <button
            type="button"
            onClick={() => setVideoLinks([...videoLinks, ""])}
            className="mb-4 text-sm text-red-700 hover:underline font-medium flex items-center gap-1"
            disabled={isAnalyzing}
          >
            <Plus className="w-4 h-4" /> Add Video
          </button>
        )}

        {/* Credit Type Buttons */}
        <div className="mb-6">
        <label className="block text-sm font-medium text-red-700 mb-2">
          Credit Type
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedCredit('Regular')}
            className={`w-1/2 py-2 flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition
              ${selectedCredit === "Regular"
                ? "bg-red-600 text-white border-red-600 shadow-md"
                : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
              }
              ${isAnalyzing || regularCredits === null ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            disabled={isAnalyzing || regularCredits === null} 
          >
            {regularCredits === null ? (
              // Show spinning loader if regularCredits is null (loading)
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <BadgeDollarSign className="w-4 h-4" /> Regular Credits ({regularCredits})
              </>
            )}
          </button>
          <button
            onClick={() => setSelectedCredit("Special")}
            className={`w-1/2 py-2 flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition
              ${selectedCredit === "Special"
                ? "bg-red-600 text-white border-red-600 shadow-md"
                : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
              }
              ${isAnalyzing ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            disabled={isAnalyzing}
          >
            {specialCredits === null ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Special Credits ({specialCredits})
              </>
            )}
          </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-700 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Analyze CTA */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || videoLinks.every(link => link.trim() === '')}
          className={`w-full py-3 rounded-xl font-semibold text-white text-lg shadow-md transition transform flex items-center justify-center gap-2
            ${isAnalyzing
              ? "bg-red-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:-translate-y-1"}`}
        >
          <PlayCircle className="w-5 h-5" />
          {isAnalyzing ? "Summarizing..." : "Summarize videos now"}
        </button>

        {/* Buy More Credits Button */}
        <button
          onClick={() => router.push('/pricing')}
          className="mt-4 w-full bg-white text-red-600 border border-red-300 hover:bg-red-100 py-2 rounded-xl font-semibold transition shadow-sm flex items-center justify-center gap-2"
          disabled={isAnalyzing}
        >
          <CreditCard className="w-5 h-5" /> Buy More Credits
        </button>
      </div>
    </motion.div>
  );
};

export default YouTubeAnalyzerHome;
