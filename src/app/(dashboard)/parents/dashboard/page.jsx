
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AiInsightCard from "@/components2/parents/AiInstantCard";
import ChildSelector from "@/components2/parents/ChildSector";
import FocusGauge from "@/components2/parents/FocusGuge";
import SummaryCards from "@/components2/parents/SummuryCards";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

export default function ParentDashboardPage() {
  const [insight, setInsight] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("parentToken") : null;

  // 🌟 Demo Data
  const demoData = {
    focusScore: 82,
    emotions: ["Happy", "Calm", "Motivated"],
    weeklySummary:
      "Your child showed consistent focus this week! Participation was high, and mood balance remained steady.",
    moodTrend: [
      { day: "Sun", mood: 85 },
      { day: "Mon", mood: 60 },
      { day: "Tue", mood: 70 },
      { day: "Wed", mood: 75 },
      { day: "Thu", mood: 65 },

    ],
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/parents/login";
      return;
    }

    fetch(`/api/parent/insights${selectedChild ? `?studentId=${selectedChild._id}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setInsight(d.data);
        else setInsight(demoData);
      })
      .catch(() => setInsight(demoData));
  }, [selectedChild]);

  async function generateReport() {
    if (!token) return;
    setLoading(true);
    const res = await fetch("/api/parent/mental-report", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ period: "this week" }),
    });
    const data = await res.json();
    if (data.success) setReport(data.report);
    else setReport("⚠️ Failed to generate report. Showing demo.");
    setLoading(false);
  }

  // 🔒 Logout Function
  function handleLogout() {
    localStorage.removeItem("parentToken");
    window.location.href = "/";
  }

  // 🎨 Emotion Colors
  const emotionColors = {
    Happy: "bg-yellow-200 text-yellow-800",
    Calm: "bg-blue-200 text-blue-800",
    Motivated: "bg-green-200 text-green-800",
    Sad: "bg-gray-300 text-gray-800",
    Angry: "bg-red-200 text-red-800",
    Excited: "bg-pink-200 text-pink-800",
    Relaxed: "bg-teal-200 text-teal-800",
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe] dark:from-[#0f172a] dark:to-[#1e293b] transition-all duration-700">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-[var(--popover-foreground)]">
              👨‍👩‍👧 Parent Dashboard
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Track your child’s emotional growth and learning balance 🌿
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ChildSelector onChange={setSelectedChild} />
            <button
              onClick={generateReport}
              disabled={loading}
              className="py-2 px-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              {loading ? "Generating..." : "✨ AI Report"}
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow hover:scale-105 transition-all"
            >
              🚪 Logout
            </button>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-[var(--card)] p-4 rounded-xl shadow card-glow border border-white/10">
              <p className="text-sm text-[var(--muted-foreground)]">🎯 Focus Score</p>
              <p className="text-3xl font-bold text-[var(--popover-foreground)]">
                {insight?.focusScore || demoData.focusScore}
              </p>
            </div>

            <div className="bg-[var(--card)] p-4 rounded-xl shadow card-glow border border-white/10">
              <p className="text-sm text-[var(--muted-foreground)]">💫 Primary Emotions</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {(insight?.emotions || demoData.emotions).map((e, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                      emotionColors[e] || "bg-indigo-200 text-indigo-800"
                    }`}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] p-4 rounded-xl shadow card-glow border border-white/10">
              <p className="text-sm text-[var(--muted-foreground)]">📅 Weekly Summary</p>
              <p className="mt-2 text-[var(--popover-foreground)] text-sm leading-relaxed">
                {insight?.weeklySummary || demoData.weeklySummary}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mood Trend & Focus */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-[var(--card)] p-6 rounded-2xl shadow-xl border border-white/10 dark:border-white/5 backdrop-blur-sm"
          >
            <h3 className="font-semibold mb-4 text-[var(--popover-foreground)] flex items-center gap-2">
              🌈 Weekly Mood Trend
            </h3>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={insight?.moodTrend || demoData.moodTrend}>
                  <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <defs>
                    <linearGradient id="moodGradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="url(#moodGradient)"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#a855f7", stroke: "white", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--card)] p-6 rounded-2xl shadow-xl flex items-center justify-center border border-white/10"
          >
            <FocusGauge score={insight?.focusScore || demoData.focusScore} />
          </motion.div>
        </div>

        {/* AI Insight */}
        <AiInsightCard
          report={
            report ||
            `🌟 Demo Insight 🌟  
This week, your child maintained strong focus and a positive attitude.  
Encourage outdoor breaks and creative play to keep the balance.`
          }
        />
      </div>
    </div>
  );
}
