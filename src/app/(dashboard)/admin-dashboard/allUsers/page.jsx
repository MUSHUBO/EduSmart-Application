"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/allUsers");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId, newRole) => {
    const user = users.find((u) => u._id === userId);
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1D4ED8",
      cancelButtonColor: "#D14343",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch("/api/updateRole", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, role: newRole }),
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire("Updated!", `${user.name} is now ${newRole}.`, "success");
          fetchUsers();
        } else {
          Swal.fire("Error!", data.message || "Failed to update role", "error");
        }
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="loading" visible />
      </div>
    );
  }

  const roles = ["admin", "teacher", "student", "user"];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
          className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold transition-transform duration-300 hover:scale-105"
        >
          {viewMode === "table" ? "Grid View" : "Table View"}
        </button>
      </div>

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-md">
          <table className="min-w-full bg-white text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold uppercase">Name</th>
                <th className="px-6 py-3 text-left font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-center font-semibold uppercase">Role</th>
                <th className="px-6 py-3 text-right font-semibold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50`}
                >
                  {/* Name */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <span className="font-semibold text-gray-800 truncate max-w-[140px]">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-3 flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-gray-400" />
                    <span className="truncate max-w-[200px]">{user.email}</span>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Actions (Dropdown) */}
                  <td className="px-6 py-3 text-right relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === user._id ? null : user._id)
                      }
                      className="px-4 py-1.5 rounded-md bg-[var(--primary)] text-white font-medium hover:hover:bg-[var(--secondary)] flex items-center justify-center gap-2 transition-all"
                    >
                      Change Role <FaChevronDown className="text-xs" />
                    </button>

                    <AnimatePresence>
                      {openDropdown === user._id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-6 mt-2 w-40 bg-white shadow-xl rounded-lg border font-extrabold border-gray-100 overflow-hidden z-50"
                        >
                          {roles.map((role) => (
                            <button
                              key={role}
                              onClick={() => {
                                updateRole(user._id, role);
                                setOpenDropdown(null);
                              }}
                              disabled={user.role === role}
                              className={`w-full text-left px-4 py-2 text-sm capitalize ${
                                user.role === role
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "hover:bg-indigo-50 text-gray-700"
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
