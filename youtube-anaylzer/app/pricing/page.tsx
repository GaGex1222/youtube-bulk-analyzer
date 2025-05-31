'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Rocket } from 'lucide-react';

const CreditModal = ({
  isOpen,
  onClose,
  planName,
}: {
  isOpen: boolean;
  onClose: () => void;
  planName: 'Simple' | 'Advanced';
}) => {
  const [count, setCount] = useState(1);
  const pricePerCredit = planName === 'Simple' ? 0.03 : 0.05;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{planName} Credits</h3>
            <p className="text-red-600 mb-6 text-sm">
              ${pricePerCredit.toFixed(2)} per minute (1 credit)
            </p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                className="w-10 h-10 text-xl rounded-full bg-red-200 hover:bg-red-300 transition"
                onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-xl font-bold">{count}</span>
              <button
                className="w-10 h-10 text-xl rounded-full bg-red-200 hover:bg-red-300 transition"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <p className="text-lg font-semibold mb-6">
              Total: ${(count * pricePerCredit).toFixed(2)}
            </p>

            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition w-full">
              Purchase {count} Credits
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PricingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Simple' | 'Advanced'>('Simple');

  const openModal = (plan: 'Simple' | 'Advanced') => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

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
          {/* Simple Plan */}
          <div className="bg-white border border-red-300 rounded-2xl p-8 shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Simple AI</h2>
            <p className="text-red-700 text-lg mb-6">$0.03 / minute (1 credit)</p>
            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Summarize YouTube videos</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Bullet-point & short paragraph summaries</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Fast & affordable</li>
              <li className="flex items-center gap-2"><XCircle className="text-red-500" /> No topic detection or tone analysis</li>
              <li className="flex items-center gap-2"><XCircle className="text-red-500" /> No keyword highlighting</li>
              <li className="flex items-center gap-2"><XCircle className="text-red-500" /> No export to PDF/Markdown</li>
            </ul>
            <button
              onClick={() => openModal('Simple')}
              className="mt-auto px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Buy Simple Credits
            </button>
          </div>

          {/* Advanced Plan */}
          <div className="bg-white border-2 border-red-500 rounded-2xl p-8 shadow-xl flex flex-col">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Rocket className="text-red-600" /> Advanced AI
            </h2>
            <p className="text-red-700 text-lg mb-6">$0.05 / minute (1 credit)</p>
            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> In-depth summarization</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Topic detection & tone analysis</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Keyword highlighting</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Export to PDF or Markdown</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-green-600" /> Highest accuracy & language quality</li>
            </ul>
            <button
              onClick={() => openModal('Advanced')}
              className="mt-auto px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2 justify-center"
            >
              <Rocket size={16} /> Buy Advanced Credits
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <CreditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan}
      />
    </div>
  );
};

export default PricingPage;
