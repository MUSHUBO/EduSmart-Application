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
import UpcomingExams from "./UpcomingExam";
import SearchNotice from "./SearchNotice";
import NoticeTablePage from "./NoticeTablePage";


export default function NoticeBoard() {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);
  const [exams, setExams] = useState([]);

 useEffect(() => {
  fetch("/api/notice/seed")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched Notices:", data);
      setNotices(data);
    });
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
    <div className="space-y-6 p-4 text-foreground">
   
    {/* 🔴 Breaking News */}
<div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md overflow-hidden">
  <div className="flex items-center gap-2 py-2 px-4">
    <span className="font-bold text-yellow-300">🔔 BREAKING NEWS</span>
    <div className="overflow-hidden w-full">
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "marquee 40s linear infinite",
        }}
      >
        {notices.length > 0
          ? notices.slice(0, 4).map((n, i) => ( 
              <span key={i} style={{ marginRight: "2rem" }}>
                {n.title}
              </span>
            ))
          : "🚨 No new notices available"}
      </div>
    </div>
  </div>

  {/* Inline keyframes */}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 border-blue-500">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Total Students</p>
            <h2 className="text-2xl font-bold">{stats.students || 1250}</h2>
          </div>
        </div>
        <div className="p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 border-green-500">
          <Bell className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Active Notices</p>
            <h2 className="text-2xl font-bold">{stats.notices || 45}</h2>
          </div>
        </div>
        <div className="p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 border-purple-500">
          <Calendar className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
            <h2 className="text-2xl font-bold">{stats.exams || 8}</h2>
          </div>
        </div>
        <div className="p-4 bg-background text-foreground rounded-lg shadow flex items-center gap-3 border-t-4 border-yellow-500">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-muted-foreground">Achievements</p>
            <h2 className="text-2xl font-bold">{stats.achievements || 23}</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-background text-foreground p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyAttendance}>
              <XAxis dataKey="day" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip contentStyle={{ backgroundColor: "var(--background)", color: "var(--foreground)" }} />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
              <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notices by Dept */}
        <div className="bg-background text-foreground p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Notices by Department</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataByDept}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
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

    <div className="space-y-3">
     {/* <UpcomingExams></UpcomingExams> */}
      <SearchNotice></SearchNotice>
   <NoticeTablePage></NoticeTablePage>
    </div>
    </div>
  );
}
