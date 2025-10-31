"use client";
import React, { useEffect, useState, useContext } from "react";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "@/Context/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPurchasedCourses() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table"); 

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyPayments = async () => {
      try {
        const res = await fetch(`/api/payments?email=${user.email}`);
        const data = await res.json();
        if (data.success) setPayments(data.data);
        // else console.error("Failed to fetch:", data.message);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPayments();
  }, [user]);

  const getStatusBadge = (status) => {
    const baseStyle =
      "px-3 py-1 rounded-full text-sm font-semibold text-white inline-block";
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className={baseStyle} style={{ backgroundColor: "var(--primary)" }}>
            Completed
          </span>
        );
      case "pending":
        return (
          <span className={baseStyle} style={{ backgroundColor: "var(--secondary)" }}>
            Pending
          </span>
        );
      case "failed":
        return (
          <span className={baseStyle} style={{ backgroundColor: "var(--accent)" }}>
            Failed
          </span>
        );
      default:
        return (
          <span className={baseStyle} style={{ backgroundColor: "var(--muted)" }}>
            {status || "N/A"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars height="80" width="80" color="var(--primary)" visible={true} />
      </div>
    );
  }

  if (!payments.length) {
    return <p className="p-6 text-[var(--foreground)]">No purchased courses found.</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">My Courses</h1>
        <button
          onClick={() => setView(view === "table" ? "grid" : "table")}
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          className="px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          {view === "table" ? "Switch to Grid View" : "Switch to Table View"}
        </button>
      </div>

      {/* Table View */}
      {view === "table" ? (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-[var(--muted)]">
          <table className="w-full border-collapse">
            <thead className="bg-[var(--accent)] text-[var(--foreground)]">
              <tr>
                <th className="px-6 py-3 text-left rounded-tl-lg">Course Title</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Payment Method</th>
                <th className="px-6 py-3 text-left">Date</th>
                {/* <th className="px-6 py-3 text-left rounded-tr-lg">Status</th> */}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {payments.map((payment, idx) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-[var(--muted)] border-b hover:bg-[var(--accent)] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{payment.courseTitle}</td>
                    <td className="px-6 py-4">${payment.price}</td>
                    <td className="px-6 py-4">{payment.transactionId}</td>
                    <td className="px-6 py-4">{payment.paymentMethod || "N/A"}</td>
                    <td className="px-6 py-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    {/* <td className="px-6 py-4">{getStatusBadge(payment.status)}</td> */}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {payments.map((payment, idx) => (
              <motion.div
                key={payment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.05 }}
                className="border lg:border-8  border-[var(--accent)] rounded-lg shadow p-5 hover:shadow-xl transition bg-[var(--muted)]"
              >
                <h2 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{payment.courseTitle}</h2>
                <p className="mb-1">
                  <span className="font-medium text-[var(--foreground)]">Price:</span> ${payment.price}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-[var(--foreground)]">Transaction:</span> {payment.transactionId}
                </p>
                <p className="mb-1">
                  <span className="font-medium text-[var(--foreground)]">Payment Method:</span> {payment.paymentMethod || "N/A"}
                </p>
                <p className="mb-2">
                  <span className="font-medium text-[var(--foreground)]">Date:</span> {new Date(payment.createdAt).toLocaleDateString()}
                </p>
                {/* <div>{getStatusBadge(payment.status)}</div> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
