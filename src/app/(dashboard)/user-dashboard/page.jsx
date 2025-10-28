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

const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e"];

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const userName = user?.displayName || "Student";

  // Animation Variants
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

  // Mock chat messages
  const userChats = [
    {
      sender: "System",
      msg: `🎉 Welcome back ${userName}! Your learning streak is strong!`,
      time: "Today, 8:45 AM",
    },
    {
      sender: "Ms. Taylor (Math Teacher)",
      msg: "Great work on your last assignment. You improved your score by 15%! 💪",
      time: "Yesterday, 6:30 PM",
    },
    {
      sender: "Campus Bot",
      msg: "Don’t forget: Science Fair on Thursday at 10 AM 🧪",
      time: "2 days ago",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Welcome Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mx-auto items-center flex justify-center">
          Welcome Back, <span className="text-blue-600">{userName} </span>
        </h2>
        <p className="text-gray-500 mt-1 text-lg mx-auto items-center flex justify-center">
          Here’s a personalized snapshot of your progress and updates.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <FaUserGraduate />,
            label: "Courses Completed",
            value: "12",
            change: "+2 this month",
            color: "blue",
          },
          {
            icon: <FaChalkboardTeacher />,
            label: "Active Teachers",
            value: "8",
            change: "3 new mentors added",
            color: "red",
          },
          {
            icon: <FaCalendarAlt />,
            label: "Upcoming Events",
            value: "5",
            change: "Science Fair this week",
            color: "yellow",
          },
          {
            icon: <FaUtensils />,
            label: "Cafeteria Points",
            value: "1,240",
            change: "+120 bonus points 🎁",
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
        {/* Performance Progress */}
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

        {/* Subject Overview */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Subject Overview</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Attendance Trend */}
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

        {/* Cafeteria Distribution */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="font-semibold mb-4 text-gray-700">Cafeteria Distribution</h4>
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

      {/* Real Chat Section */}
      <motion.div
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex items-center mb-4 space-x-2">
          <FaComments className="text-blue-500 text-2xl" />
          <h4 className="font-semibold text-gray-700 text-lg">Recent Messages</h4>
        </div>
        <div className="space-y-4">
          {userChats.map((chat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
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
