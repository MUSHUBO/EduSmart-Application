"use client";
import { motion } from "framer-motion";

export default function AiInsightCard({ report }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-white/10"
    >
      <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300 flex items-center gap-2">
        🧠 AI Mental Insight
      </h3>
      <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
        {report}
      </p>
    </motion.div>
  );
}
