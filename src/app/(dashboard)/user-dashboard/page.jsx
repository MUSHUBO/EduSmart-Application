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

const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e"];

export default function UserDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back, <span className="text-blue-600">Student!</span></h2>
        <p className="text-gray-500 mt-1">Here’s an overview of your activities and progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FaUserGraduate />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed Courses</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <FaChalkboardTeacher />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Teachers</p>
            <h3 className="text-xl font-bold">8</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-sm text-gray-500">Upcoming Events</p>
            <h3 className="text-xl font-bold">5</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <FaUtensils />
          </div>
          <div>
            <p className="text-sm text-gray-500">Cafeteria Points</p>
            <h3 className="text-xl font-bold">1.2k</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Performance Progress</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Subject Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Attendance Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
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
              <Area
                type="monotone"
                dataKey="present"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorPresent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4 text-gray-700">Cafeteria Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={foodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {foodData.map((entry, index) => (
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
