"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Bell, Calendar, Trophy } from "lucide-react";
import SearchNotice from "./SearchNotice";
import NoticeTablePage from "./NoticeTablePage";
import ExamPage from "./UpcomingExam";

export default function NoticeBoard() {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/notice/seed")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  const weeklyAttendance = [
    { day: "Sun", present: 960, absent: 40 },
    { day: "Mon", present: 950, absent: 50 },
    { day: "Tue", present: 900, absent: 80 },
    { day: "Wed", present: 980, absent: 20 },
    { day: "Thu", present: 970, absent: 30 },
  ];

  const dataByDept = [
    { name: "Science", value: 12 },
    { name: "Arts", value: 8 },
    { name: "Commerce", value: 6 },
    { name: "Sports", value: 15 },
    { name: "Cultural", value: 10 },
  ];

  const deptColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="mx-auto max-w-[1280px] space-y-6 p-3 sm:p-4 md:p-6 text-foreground">
      {/* 🔴 Breaking News */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center py-2 px-3 sm:px-4 gap-2">
          <span className="font-bold text-yellow-300 text-sm sm:text-base md:text-lg">
            🔔 BREAKING NEWS
          </span>
          <div className="overflow-hidden w-full">
            <div
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                animation: "marquee 40s linear infinite",
              }}
              className="text-xs sm:text-sm md:text-base"
            >
              {notices.length > 0
                ? notices.map((n, i) => (
                    <span
                      key={i}
                      className="mr-6 inline-block truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]"
                    >
                      {n.title}
                    </span>
                  ))
                : "🚨 No new notices available"}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Users, title: "Total Students", value: stats.students || 1250, border: "border-blue-500" },
          { icon: Bell, title: "Active Notices", value: stats.notices || 45, border: "border-green-500" },
          { icon: Calendar, title: "Upcoming Events", value: stats.exams || 8, border: "border-purple-500" },
          { icon: Trophy, title: "Achievements", value: stats.achievements || 23, border: "border-yellow-500" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-3 sm:p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 ${item.border}`}
            >
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-current" />
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground">{item.title}</p>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{item.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Weekly Attendance */}
        <div className="bg-background text-foreground p-3 sm:p-4 rounded shadow w-full min-h-[220px] md:min-h-[280px]">
          <h2 className="font-semibold mb-2 text-base sm:text-lg">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyAttendance}>
              <XAxis dataKey="day" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
              />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
              <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notices by Department */}
        <div className="bg-background text-foreground p-3 sm:p-4 rounded shadow w-full min-h-[220px] md:min-h-[280px]">
          <h2 className="font-semibold mb-2 text-base sm:text-lg">Notices by Department</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataByDept}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                label
              >
                {dataByDept.map((_, i) => (
                  <Cell key={i} fill={deptColors[i % deptColors.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Other Sections */}
      <div className="space-y-3">
        <ExamPage></ExamPage>
        <SearchNotice />
        <NoticeTablePage />
      </div>
    </div>
  );
}
