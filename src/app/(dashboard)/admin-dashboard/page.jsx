'use client';

import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUtensils,
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
import { motion } from "framer-motion";

// Demo Data
const performanceData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 100 },
  { month: "May", value: 95 },
];

const overviewData = [
  { name: "Math", students: 400 },
  { name: "Science", students: 300 },
  { name: "English", students: 500 },
  { name: "Art", students: 200 },
];

const attendanceData = [
  { day: "Mon", present: 95 },
  { day: "Tue", present: 88 },
  { day: "Wed", present: 90 },
  { day: "Thu", present: 92 },
  { day: "Fri", present: 85 },
];

const foodData = [
  { name: "Breakfast", value: 400 },
  { name: "Lunch", value: 300 },
  { name: "Snacks", value: 200 },
  { name: "Dinner", value: 100 },
];

const COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "var(--accent-foreground)",
  "var(--accent)",
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AdminDashboard() {
  return (
    <div className="space-y-10">
      <motion.h2
        className="text-3xl font-bold mb-4 text-[var(--foreground)]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome  Admin 
      </motion.h2>

      {/* ==== Stats Cards ==== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Students",
            value: "932",
            icon: <FaUserGraduate />,
            color: "bg-[var(--primary)]",
          },
          {
            title: "Teachers",
            value: "754",
            icon: <FaChalkboardTeacher />,
            color: "bg-[var(--secondary)]",
          },
          {
            title: "Events",
            value: "40",
            icon: <FaCalendarAlt />,
            color: "bg-[var(--accent-foreground)]",
          },
          {
            title: "Foods",
            value: "32k",
            icon: <FaUtensils />,
            color: "bg-[var(--accent)]",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -5 }}
            className={`p-6 rounded-2xl shadow-lg flex items-center space-x-4 
              bg-[var(--background)] border border-[var(--accent)] transition-all`}
          >
            <div
              className={`${item.color} p-4 rounded-full text-[var(--primary-foreground)] shadow-md`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">
                {item.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==== Charts Section ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-[var(--background)] p-6 rounded-2xl shadow-lg border border-[var(--accent)]"
        >
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">
            School Performance
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-[var(--background)] p-6 rounded-2xl shadow-lg border border-[var(--accent)]"
        >
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">
            Subject Overview
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="students" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Area Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-[var(--background)] p-6 rounded-2xl shadow-lg border border-[var(--accent)]"
        >
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">
            Attendance Trend
          </h4>
          <ResponsiveContainer width="100%" height={250}>
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
              <Area
                type="monotone"
                dataKey="present"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorPresent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-[var(--background)] p-6 rounded-2xl shadow-lg border border-[var(--accent)]"
        >
          <h4 className="font-semibold mb-4 text-[var(--foreground)]">
            Cafeteria Distribution
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={foodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {foodData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
