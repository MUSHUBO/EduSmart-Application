
"use client";
import { motion } from "framer-motion";

export default function SummaryCards({ focus, emotions, summary }) {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-5 rounded-xl shadow-md bg-gradient-to-r from-green-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-700/30"
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">Focus Score</p>
        <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">{focus}</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-100 to-violet-200 dark:from-indigo-900/40 dark:to-violet-700/30"
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">Primary Emotions</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {(emotions || []).map((e, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/60 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 text-sm font-medium"
            >
              {e}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-5 rounded-xl shadow-md bg-gradient-to-r from-pink-100 to-rose-200 dark:from-rose-900/40 dark:to-pink-700/30"
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">Weekly Summary</p>
        <p className="mt-2 text-gray-800 dark:text-gray-100 text-base leading-relaxed">
          {summary}
        </p>
      </motion.div>
    </div>
  );
}
