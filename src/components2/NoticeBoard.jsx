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

export default function NoticeBoard() {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/stats").then((res) => res.json()).then(setStats);
    fetch("/api/notices").then((res) => res.json()).then(setNotices);
    fetch("/api/exams").then((res) => res.json()).then(setExams);
  }, []);

  const weeklyAttendance = [
    { day: "Mon", present: 950, absent: 50 },
    { day: "Tue", present: 900, absent: 80 },
    { day: "Wed", present: 980, absent: 20 },
    { day: "Thu", present: 970, absent: 30 },
    { day: "Fri", present: 960, absent: 40 },
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
      <div className="bg-red-600 text-white rounded-lg overflow-hidden shadow-md">
        <div className="whitespace-nowrap animate-marquee py-2 px-4 font-semibold">
          {notices.length > 0
            ? notices.map((n) => `${n.title} | `)
            : "🚨 Breaking News: No new notices available"}
        </div>
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

      {/* Upcoming Exams */}
      <div className="bg-background text-foreground p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Upcoming Exams</h2>
        <ul className="space-y-2">
          {exams.map((exam, i) => (
            <li key={i} className="flex justify-between border p-2 rounded">
              {exam.subject} - {new Date(exam.date).toLocaleDateString()}
              <button className="text-primary font-medium">See Routine</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notices Table */}
      <div className="bg-background text-foreground p-4 rounded shadow overflow-x-auto">
        <h2 className="font-semibold mb-2">Notices</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Title</th>
              <th className="p-2">Department</th>
              <th className="p-2">Download</th>
              <th className="p-2">View</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{new Date(n.createdAt).toLocaleDateString()}</td>
                <td className="p-2">{n.title}</td>
                <td className="p-2">{n.department}</td>
                <td className="p-2"><a href={n.fileUrl} download>📂</a></td>
                <td className="p-2"><a href={`/notices/${n._id}`}>👁</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
