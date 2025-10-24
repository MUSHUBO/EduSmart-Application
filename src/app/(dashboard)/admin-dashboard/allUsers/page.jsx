"use client";

import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("table");

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
        const user = users.find(u => u._id === userId);

        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Change ${user.name}'s role to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: newRole === "admin" ? "#1D4ED8" : "#059669",
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

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            {/* Toggle Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-black">All Users</h1>
                <button
                    onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
                    className="relative inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg text-white font-semibold transition-transform duration-300 hover:scale-105 focus:outline-none"
                >
                    {viewMode === "table" ? "Grid View" : "Table View"}
                </button>
            </div>

            {viewMode === "table" && (
                <div className="space-y-6">
                    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-md">
                        <table className="min-w-full bg-white text-sm text-gray-700">
                            <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold uppercase text-gray-600 tracking-wider w-1/4">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase text-gray-600 tracking-wider w-1/4">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-center font-semibold uppercase text-gray-600 tracking-wider w-1/6">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-right font-semibold uppercase text-gray-600 tracking-wider w-1/4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {users.map((user, idx) => (
                                    <tr
                                        key={user._id}
                                        className={`transition-all duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-blue-50`}
                                    >
                                        {/* Name */}
                                        <td className="px-6 py-3 whitespace-nowrap">
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
                                        <td className="px-6 py-3 whitespace-nowrap flex items-center gap-2 text-gray-600">
                                            <FaEnvelope className="text-gray-400 shrink-0" />
                                            <span className="truncate max-w-[200px]">{user.email}</span>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-3 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${user.role === "admin"
                                                        ? "bg-blue-100 text-blue-700 border-blue-200"
                                                        : "bg-green-100 text-green-700 border-green-200"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-3 whitespace-nowrap flex justify-end gap-3">
                                            <button
                                                onClick={() => updateRole(user._id, "admin")}
                                                className={`px-4 py-1.5 rounded-md text-white font-medium transition-all duration-200 ${user.role === "admin"
                                                        ? "bg-blue-300 cursor-not-allowed"
                                                        : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-sm"
                                                    }`}
                                                disabled={user.role === "admin"}
                                            >
                                                Admin
                                            </button>
                                            <button
                                                onClick={() => updateRole(user._id, "student")}
                                                className={`px-4 py-1.5 rounded-md text-white font-medium transition-all duration-200 ${user.role === "student"
                                                        ? "bg-green-300 cursor-not-allowed"
                                                        : "bg-green-600 hover:bg-green-700 hover:scale-105 shadow-sm"
                                                    }`}
                                                disabled={user.role === "student"}
                                            >
                                                Student
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}





            {/* Grid/Card View */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div
                            key={user._id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
                        >
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-indigo-200 dark:text-black"
                            />
                            <h2 className="text-xl font-semibold mb-1 dark:text-black">{user.name}</h2>
                            <p className="text-gray-500 flex items-center gap-1 justify-center mb-2">
                                <FaEnvelope /> {user.email}
                            </p>
                            <span
                                className={`mb-4 px-3 py-1 rounded-full text-sm font-semibold 
                  ${user.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                            >
                                {user.role}
                            </span>
                            <div className="flex gap-3 w-full justify-center">
                                <button
                                    onClick={() => updateRole(user._id, "admin")}
                                    className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transform transition
                    ${user.role === "admin"
                                            ? "bg-blue-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600 hover:scale-105"}`}
                                    disabled={user.role === "admin"}
                                >
                                    Admin
                                </button>
                                <button
                                    onClick={() => updateRole(user._id, "student")}
                                    className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transform transition
                    ${user.role === "student"
                                            ? "bg-green-300 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600 hover:scale-105"}`}
                                    disabled={user.role === "student"}
                                >
                                    Student
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
