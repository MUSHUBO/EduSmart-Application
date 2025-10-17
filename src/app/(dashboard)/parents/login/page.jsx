
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ParentLogin() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
 
  const router = useRouter();

 

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("/api/parent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) return setErr(data.message);
      localStorage.setItem("parentToken", data.token);
      router.push("/parents/dashboard");
    } catch {
      setErr("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#93C5FD,_transparent_70%),_radial-gradient(circle_at_bottom_right,_#F9A8D4,_transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,_#1E3A8A,_transparent_70%),_radial-gradient(circle_at_bottom_right,_#831843,_transparent_70%)] blur-3xl opacity-50"
      />


      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 mx-3"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Parent Login
          </h2>
          
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your registered email to view your child’s performance insights.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1">
              Parent Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {err && (
            <div className="text-sm text-red-500 font-medium text-center">
              {err}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 rounded-xl bg-primary text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SmartSchool Analytics. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
