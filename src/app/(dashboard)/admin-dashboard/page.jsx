import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaUtensils } from "react-icons/fa";

function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FaUserGraduate />
          </div>
          <div>
            <p className="text-sm text-gray-500">Students</p>
            <h3 className="text-xl font-bold">932</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <FaChalkboardTeacher />
          </div>
          <div>
            <p className="text-sm text-gray-500">Teachers</p>
            <h3 className="text-xl font-bold">754</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <FaCalendarAlt />
          </div>
          <div>
            <p className="text-sm text-gray-500">Events</p>
            <h3 className="text-xl font-bold">40</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <FaUtensils />
          </div>
          <div>
            <p className="text-sm text-gray-500">Foods</p>
            <h3 className="text-xl font-bold">32k</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4">School Performance</h4>
          {/* Replace with chart library */}
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-4">School Overview</h4>
          <div className="flex space-x-4 mb-4">
            <button className="btn btn-sm btn-primary">Week</button>
            <button className="btn btn-sm">Month</button>
            <button className="btn btn-sm">Year</button>
            <button className="btn btn-sm">All</button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
