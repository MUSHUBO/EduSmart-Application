"use client";
import { useState } from "react";
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

      // ✅ Save parent info (no token)
      localStorage.setItem("parentEmail", data.parent.email);
      localStorage.setItem("parentName", data.parent.name);

      router.push("/user-dashboard/parent-dashboard");
    } catch {
      setErr("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 mx-3"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Parent Login
        </h2>

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
          © {new Date().getFullYear()} SmartSchool Analytics
        </p>
      </motion.div>
    </div>
  );
}
