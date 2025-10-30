"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUtensils,
  FaComments,
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
import { AuthContext } from "@/Context/AuthContext/AuthContext";

// Demo Data
const performanceData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 92 },
  { month: "Mar", value: 76 },
  { month: "Apr", value: 99 },
  { month: "May", value: 95 },
  { month: "Jun", value: 97 },
];

const overviewData = [
  { name: "Mathematics", students: 420 },
  { name: "Physics", students: 360 },
  { name: "English", students: 480 },
  { name: "Art", students: 210 },
];

const attendanceData = [
  { day: "Mon", present: 97 },
  { day: "Tue", present: 92 },
  { day: "Wed", present: 95 },
  { day: "Thu", present: 94 },
  { day: "Fri", present: 90 },
];

const foodData = [
  { name: "Breakfast", value: 350 },
  { name: "Lunch", value: 450 },
  { name: "Snacks", value: 200 },
  { name: "Dinner", value: 180 },
];

const COLORS = ["var(--primary)", "var(--secondary)", "var(--accent)", "var(--primary-foreground)"];

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const userName = user?.displayName || "Student";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" } }),
  };

  const bounce = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i = 1) => ({ scale: 1, opacity: 1, transition: { delay: i * 0.1, type: "spring", stiffness: 120 } }),
  };

  const userChats = [
    { sender: "System", msg: `🎉 Welcome back ${userName}! Keep up the great work!`, time: "Today, 8:45 AM" },
    { sender: "Ms. Taylor (Math Teacher)", msg: "Well done on your last assignment! You improved 15% ", time: "Yesterday, 6:30 PM" },
    { sender: "Campus Bot", msg: "Reminder: Science Fair on Thursday at 10 AM ", time: "2 days ago" },
  ];

  const statsCards = [
    { icon: <FaUserGraduate />, label: "Courses Completed", value: "12", change: "+2 this month", color: "primary" },
    { icon: <FaChalkboardTeacher />, label: "Active Teachers", value: "8", change: "3 new mentors added", color: "secondary" },
    { icon: <FaCalendarAlt />, label: "Upcoming Events", value: "5", change: "Science Fair this week", color: "accent" },
    { icon: <FaUtensils />, label: "Cafeteria Points", value: "1,240", change: "+120 bonus points ", color: "primary-foreground" },
  ];

  return (
    <div className="p-6 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-[var(--foreground)]">
          Welcome Back, <span className="text-[var(--primary)]">{userName}</span>
        </h2>
        <p className="text-[var(--muted-foreground)] mt-2 text-lg">
          Here's a personalized overview of your progress and updates
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statsCards.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={bounce}
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--background)] border border-[var(--accent)] p-6 rounded-2xl shadow flex flex-col items-start justify-between transition-all hover:shadow-lg"
          >
            <div className={`p-3 rounded-full bg-[var(--${item.color})]-100 text-[var(--${item.color}-foreground)] text-2xl`}>
              {item.icon}
            </div>
            <div className="mt-3">
              <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">{item.value}</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{item.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Performance Progress</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Overview */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Subject Overview</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="students" fill="var(--secondary)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Trend */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Attendance Trend</h4>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Area type="monotone" dataKey="present" stroke="var(--primary)" fill="url(#colorPresent)" fillOpacity={1} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cafeteria */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">Cafeteria Distribution</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={foodData} cx="50%" cy="50%" labelLine={false} outerRadius={80} dataKey="value">
                {foodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Chat Section */}
      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 bg-[var(--background)] p-6 rounded-2xl shadow border border-[var(--accent)]">
        <div className="flex items-center mb-4 space-x-2">
          <FaComments className="text-[var(--primary)] text-2xl" />
          <h4 className="font-semibold text-[var(--foreground)] text-lg">Recent Messages</h4>
        </div>
        <div className="space-y-4">
          {userChats.map((chat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.2 }}
              className="p-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-foreground)] transition-all border border-[var(--accent)]"
            >
              <p className="font-medium text-[var(--foreground)]">{chat.sender}</p>
              <p className="text-[var(--muted-foreground)] text-sm mt-1">{chat.msg}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{chat.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
