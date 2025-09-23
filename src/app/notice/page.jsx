"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [notices, setNotices] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(setStats);
    fetch("/api/notices").then(res => res.json()).then(setNotices);
    fetch("/api/exams").then(res => res.json()).then(setExams);
  }, []);

  const weeklyAttendance = [
    { day: "Sun", value: 890 },
    { day: "Mon", value: 950 },
    { day: "Tue", value: 900 },
    { day: "Wed", value: 980 },
    { day: "Thu", value: 970 },

  ];

  const dataByDept = [
    { name: "Science", value: 12 },
    { name: "Arts", value: 8 },
    { name: "Commerce", value: 6 },
    { name: "Sports", value: 15 },
    { name: "Cultural", value: 10 },
  ];

  return (
    <div className="p-6 space-y-6">
         <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded"> Total Students: {stats.students}</div>
        <div className="p-4 bg-white shadow rounded"> Active Notices: {stats.notices}</div>
        <div className="p-4 bg-white shadow rounded"> Upcoming  Events: {stats.exams}</div>
        <div className="p-4 bg-white shadow rounded">Achievements: {stats.achievements}</div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Weekly Attendance</h2>
          <BarChart width={400} height={200} data={weeklyAttendance}>
            <XAxis dataKey="day" />
            <YAxis />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Notices by Department</h2>
          <PieChart width={400} height={200}>
            <Pie data={dataByDept} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
              {dataByDept.map((_, i) => (
                <Cell key={i} fill={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][i]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Upcoming Exams</h2>
        <ul className="space-y-2">
          {exams.map((exam, i) => (
            <li key={i} className="flex justify-between border p-2 rounded">
              {exam.subject} - {new Date(exam.date).toLocaleDateString()}
              <button className="text-blue-600">See Routine</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notices Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Notices</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Department</th>
              <th>Download</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n, i) => (
              <tr key={i}>
                <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                <td>{n.title}</td>
                <td>{n.department}</td>
                <td><a href={n.fileUrl} download>📂</a></td>
                <td><a href={`/notices/${n._id}`}>👁</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
