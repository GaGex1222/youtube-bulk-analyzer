'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BadgeDollarSign, Sparkles, PlayCircle, CreditCard, CheckCircle, AlertCircle, PieChart, Info } from "lucide-react";

// Results component
const AnalyzeResults: React.FC<{
  results: { title: string; credits: number }[];
  onBack: () => void;
  creditsType: string;
}> = ({ results, onBack, creditsType }) => {
  const totalCredits = results.reduce((sum, r) => sum + r.credits, 0);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-red-100 text-red-900 px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-6 h-6 text-red-600" />
        <h2 className="text-4xl font-bold text-center">Analysis Results</h2>
      </div>

      <div className="flex items-center gap-2 text-red-700 text-md mb-10 text-center">
        <Info className="w-4 h-4" />
        <p>
          Credit type used: <span className="font-semibold capitalize">{creditsType}</span>
        </p>
      </div>

      <ul className="w-full max-w-2xl space-y-4 mb-8">
        {results.map(({ title, credits }, idx) => (
          <li
            key={idx}
            className="p-4 bg-white border border-red-200 rounded-2xl shadow-md flex justify-between items-start"
          >
            <span className="text-md font-medium max-w-xs">{title}</span>
            <span className="text-red-700 font-bold">{credits} Credit{credits > 1 ? 's' : ''}</span>
          </li>
        ))}
      </ul>

      <div className="mb-10 text-xl font-semibold text-red-800 flex items-center gap-2">
        <BadgeDollarSign className="w-5 h-5" />
        Total Credits Used: <span className="text-red-700">{totalCredits}</span>
      </div>

      <button
        onClick={onBack}
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold flex items-center gap-2 shadow-md"
      >
        <CheckCircle className="w-5 h-5" /> Analyze More Videos
      </button>
    </motion.div>
  );
};

const YouTubeAnalyzerHome: React.FC = () => {
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const router = useRouter();
  const [selectedCredit, setSelectedCredit] = useState<"regular" | "special">("regular");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{ title: string; credits: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    setVideoLinks(lines.slice(0, 10));
  };

  const handleAnalyze = async () => {
    if (videoLinks.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Replace with your actual API call
      const response = await fetch('http://localhost:5000/api/analyze-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: videoLinks }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze videos");
      }

      const data = await response.json();
      // Assume data = [{ title: string, credits: number }]
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

      {/* Input Box */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-6 mt-4">
        <label className="block text-sm font-medium text-red-700 mb-2">
          YouTube Links (up to 10)
        </label>
        <textarea
          placeholder="Paste up to 10 YouTube links, each on a new line"
          onChange={handleTextareaChange}
          className="w-full px-4 py-4 rounded-xl border border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 mb-4 resize-none h-48"
          disabled={isAnalyzing}
        />

        {/* Credit Type Buttons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-red-700 mb-2">
            Credit Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCredit("regular")}
              className={`w-1/2 py-2 flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition
                ${selectedCredit === "regular"
                ? "bg-red-600 text-white border-red-600"
                : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"}`}
              disabled={isAnalyzing}
            >
              <BadgeDollarSign className="w-4 h-4" /> Regular Credit (9)
            </button>
            <button
              onClick={() => setSelectedCredit("special")}
              className={`w-1/2 py-2 flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition
                ${selectedCredit === "special"
                ? "bg-red-600 text-white border-red-600"
                : "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"}`}
              disabled={isAnalyzing}
            >
              <Sparkles className="w-4 h-4" /> Special Credit (8)
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
          disabled={isAnalyzing || videoLinks.length === 0}
          className={`w-full py-3 rounded-xl font-semibold text-white text-lg shadow-md transition transform flex items-center justify-center gap-2
            ${isAnalyzing
              ? "bg-red-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:-translate-y-1"}`}
        >
          <PlayCircle className="w-5 h-5" />
          {isAnalyzing ? "Analyzing..." : "Analyze Videos Now"}
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
