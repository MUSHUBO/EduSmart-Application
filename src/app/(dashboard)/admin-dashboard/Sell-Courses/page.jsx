"use client";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function SellCourses() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/payments");
        const data = await res.json();
        if (data.success) setPayments(data.data);
        else console.error("Failed to fetch:", data.message);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const formatPaymentMethod = (method) => {
    if (!method) return "N/A";
    if (Array.isArray(method)) method = method.join(", ");
    return method.slice(0, 4); // ✅ limit to 4 characters
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars height="80" width="80" color="var(--primary)" visible={true} />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--secondary)] text-[var(--secondary-foreground)] p-6 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-2">No Payments Found</h2>
          <p className="text-[var(--foreground)]">No payment records are available.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Sold Courses</h1>
        <button
          onClick={() => setView(view === "table" ? "grid" : "table")}
          className="px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {view === "table" ? "Switch to Grid View" : "Switch to Table View"}
        </button>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-[var(--foreground)]">
                <th className="px-6 py-3 text-left rounded-tl-lg">NO</th>
                <th className="px-6 py-3 text-left rounded-tl-lg">Course Title</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Payment Method</th>
                <th className="px-6 py-3 text-left rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {payments.map((payment, index) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[var(--accent)] border-b hover:bg-[var(--secondary)] hover:shadow-md transition-all duration-300"
                  >
                    <td className="px-6 py-4 font-semibold">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold">{payment.courseTitle}</td>
                    <td className="px-6 py-4">${payment.price}</td>
                    <td className="px-6 py-4">{payment.transactionId}</td>
                    <td className="px-6 py-4 uppercase font-medium tracking-wide">
                      {formatPaymentMethod(payment.paymentMethod)}
                    </td>
                    <td className="px-6 py-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {payments.map((payment, index) => (
              <motion.div
                key={payment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="border-2 lg:border-r-8 lg:border-b-8 lg:border-primary border-[var(--primary)] rounded-xl shadow-lg p-5 bg-[var(--accent)] hover:shadow-2xl transition-all"
              >
                <h2 className="text-lg font-semibold mb-2">{payment.courseTitle}</h2>
                <p><span className="font-medium">Price:</span> ${payment.price}</p>
                <p><span className="font-medium">Transaction:</span> {payment.transactionId}</p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {formatPaymentMethod(payment.paymentMethod)}
                </p>
                <p><span className="font-medium">Date:</span> {new Date(payment.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
