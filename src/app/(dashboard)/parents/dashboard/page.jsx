"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import FocusGauge from "@/components2/parents/FocusGuge";


function Tag({ t }) {
  const cls =
    t === "Happy"
      ? "bg-green-100 text-green-800"
      : t === "Stressed"
      ? "bg-orange-100 text-orange-800"
      : "bg-indigo-100 text-indigo-800";
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>
      {t}
    </span>
  );
}

export default function ParentDashboard() {
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState(null);
  const [insight, setInsight] = useState(null);
  const [report, setReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("parentToken");
    if (!token) return router.push("/parent/login");

    fetch("/api/parent/child", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) return router.push("/parent/login");
        setChildren(d.data);
        setSelected(d.data[0]);
      })
      .catch(() => router.push("/parent/login"));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const token = localStorage.getItem("parentToken");
    fetch("/api/parent/insights", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setInsight(d.data);
        else setInsight(null);
      });
  }, [selected]);

  const genReport = async () => {
    setLoadingReport(true);
    setReport("");
    const token = localStorage.getItem("parentToken");
    const res = await fetch("/api/parent/mental-report", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period: "this week" }),
    });
    const data = await res.json();
    setLoadingReport(false);
    if (data.success) setReport(data.report);
    else setReport("Failed to generate report");
  };

  if (!selected)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--popover-foreground)]">
            Parent Insight Dashboard
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Emotional trends & weekly AI mental reports
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-[var(--popover-foreground)] mr-2">
              Select Child:
            </label>
            <select
              className="select select-bordered"
              value={selected._id}
              onChange={(e) => {
                const c = children.find(
                  (x) => String(x._id) === e.target.value
                );
                setSelected(c);
              }}
            >
              {children.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.studentFirstName} {c.studentLastName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={genReport}
            className="py-2 px-4 rounded-full bg-[var(--secondary)] text-white"
          >
            {loadingReport ? "Generating..." : "Generate AI Mental Report"}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[var(--card)] p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">Mood Trend (last 7 days)</h3>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={insight?.moodTrend || []}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="url(#grad)"
                    strokeWidth={4}
                    dot={false}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--card)] p-6 rounded-2xl shadow flex flex-col items-center">
            <h3 className="font-semibold mb-4">Focus Score</h3>
            <FocusGauge score={insight?.focusScore || 70} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[var(--card)] p-6 rounded-2xl shadow">
            <h4 className="font-semibold mb-3">Emotion Tags</h4>
            <div className="flex gap-3 flex-wrap">
              {(insight?.emotions || []).map((t, i) => (
                <Tag key={i} t={t} />
              ))}
            </div>
          </div>

          <div className="bg-[var(--card)] p-6 rounded-2xl shadow">
            <h4 className="font-semibold mb-3">Weekly Summary</h4>
            <p className="text-[var(--muted-foreground)]">
              {insight?.weeklySummary}
            </p>
          </div>
        </div>

        {report && (
          <div className="bg-[var(--card)] p-6 rounded-2xl shadow mt-6">
            <h4 className="font-semibold mb-3">AI Mental Insight Report</h4>
            <pre className="whitespace-pre-wrap text-[var(--popover-foreground)]">
              {report}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
