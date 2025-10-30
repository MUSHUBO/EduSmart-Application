'use client';
import React from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Demo Data for Teacher Dashboard
const coursesData = [
  { month: "Jan", courses: 3 },
  { month: "Feb", courses: 4 },
  { month: "Mar", courses: 2 },
  { month: "Apr", courses: 5 },
  { month: "May", courses: 4 },
];

const studentsData = [
  { course: "Math", students: 40 },
  { course: "Science", students: 35 },
  { course: "English", students: 50 },
  { course: "History", students: 30 },
];

const attendanceData = [
  { day: "Mon", attendance: 90 },
  { day: "Tue", attendance: 85 },
  { day: "Wed", attendance: 88 },
  { day: "Thu", attendance: 92 },
  { day: "Fri", attendance: 80 },
];

const COLORS = ["var(--primary)", "var(--secondary)", "var(--accent-foreground)", "var(--accent)"];

export default function TeacherDashboard() {
  return (
    <div className="p-6 bg-[var(--background)] min-h-screen space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">
          Welcome Back, <span className="text-[var(--primary)]">Teacher!</span>
        </h2>
        <p className="text-[var(--muted-foreground)] mt-1">
          Here's an overview of your courses, students, and activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Courses Created", value: 12, icon: <FaChalkboardTeacher />, color: "var(--primary)" },
          { title: "Students Enrolled", value: 250, icon: <FaUserGraduate />, color: "var(--secondary)" },
          { title: "Books Uploaded", value: 18, icon: <FaBook />, color: "var(--accent-foreground)" },
          { title: "Upcoming Classes", value: 5, icon: <FaCalendarAlt />, color: "var(--accent)" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[var(--card-background)] p-6 rounded-2xl shadow border border-[var(--accent)] flex items-center space-x-4">
            <div className="p-4 rounded-full shadow-md" style={{ backgroundColor: item.color, color: "var(--card-foreground)" }}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">{item.title}</p>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart: Courses Created Over Months */}
        <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Courses Created Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={coursesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line type="monotone" dataKey="courses" stroke="var(--primary)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Students Per Course */}
        <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Students Per Course</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
              <XAxis dataKey="course" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="students" fill="var(--secondary)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart: Attendance Trend */}
        <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Attendance Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Area type="monotone" dataKey="attendance" stroke="var(--primary)" fill="url(#colorAttendance)" fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Course Distribution */}
        <div className="bg-[var(--card-background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Course Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={studentsData} dataKey="students" cx="50%" cy="50%" outerRadius={80} label>
                {studentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
