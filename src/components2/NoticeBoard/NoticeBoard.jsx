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
import EventList from "./Event/EventList";
import StatsCards from "./StatsCard";

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
     
<StatsCards></StatsCards>
    <EventList></EventList>

       

      {/* Other Sections */}
      <div className="space-y-3">
        <ExamPage></ExamPage>
        <SearchNotice />
        <NoticeTablePage />
      </div>
    </div>
  );
}
