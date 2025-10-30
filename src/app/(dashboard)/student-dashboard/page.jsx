"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaTasks,
  FaCalendarAlt,
  FaHeart,
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
  { month: "Jan", value: 85 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 95 },
  { month: "May", value: 88 },
  { month: "Jun", value: 92 },
];

const enrolledCourses = [
  { name: "Mathematics", progress: 80 },
  { name: "Physics", progress: 70 },
  { name: "English", progress: 95 },
  { name: "Art", progress: 60 },
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

const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e"];

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const userName = user?.displayName || "Student";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const bounce = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i = 1) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 120 },
    }),
  };

  const userChats = [
    {
      sender: "System",
      msg: `🎉 Welcome back ${userName}! You have 3 assignments due this week.`,
      time: "Today, 8:45 AM",
    },
    {
      sender: "Prof. Adams",
      msg: "Excellent progress in Physics. Keep it up! 💡",
      time: "Yesterday, 6:30 PM",
    },
    {
      sender: "Campus Bot",
      msg: "Reminder: Submit your project by Friday at 5 PM 📝",
      time: "2 days ago",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Welcome Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mx-auto flex justify-center items-center">
          Welcome Back, <span className="text-blue-600">{userName}</span>
        </h2>
        <p className="text-gray-500 mt-1 text-lg mx-auto flex justify-center items-center">
          Here’s your personalized student dashboard!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <FaBook />,
            label: "Enrolled Courses",
            value: "5",
            change: "1 new this month",
            color: "blue",
          },
          {
            icon: <FaTasks />,
            label: "Assignments Pending",
            value: "3",
            change: "Submit by Friday",
            color: "red",
          },
          {
            icon: <FaCalendarAlt />,
            label: "Upcoming Exams",
            value: "2",
            change: "Math & Physics this week",
            color: "yellow",
          },
          {
            icon: <FaHeart />,
            label: "Wishlist Items",
            value: "4",
            change: "New books added",
            color: "purple",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={bounce}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-start justify-between transition-all hover:shadow-lg"
          >
            <div className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-600 text-2xl`}>
              {item.icon}
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Performance Progress</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Enrolled Courses Progress */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Course Progress</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={enrolledCourses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Attendance Trend</h4>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="present" stroke="#10b981" fillOpacity={1} fill="url(#colorPresent)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cafeteria */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Cafeteria Points</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={foodData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
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
      <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4 space-x-2">
          <FaComments className="text-blue-500 text-2xl" />
          <h4 className="font-semibold text-gray-700 text-lg">Recent Messages</h4>
        </div>
        <div className="space-y-4">
          {userChats.map((chat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.2 }}
              className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-100"
            >
              <p className="font-medium text-gray-800">{chat.sender}</p>
              <p className="text-gray-600 text-sm mt-1">{chat.msg}</p>
              <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
