"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MyAssignments() {
  const [assignments, setAssignments] = useState([]);

  const getStatusBadge = (status) => {
    const baseStyle = "px-3 py-1 rounded-full text-sm font-semibold";
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span
            className={baseStyle}
            style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
          >
            {status}
          </span>
        );
      case "submitted":
        return (
          <span
            className={baseStyle}
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            {status}
          </span>
        );
      case "graded":
        return (
          <span
            className={baseStyle}
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            {status}
          </span>
        );
      default:
        return (
          <span
            className={baseStyle}
            style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            {status}
          </span>
        );
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="p-6 min-h-screen bg-[var(--background)]">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">My Assignments</h1>

      {assignments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--accent)] text-[var(--secondary-foreground)] p-6 rounded-xl shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-2">No Assignments Found</h2>
            <p className="text-[var(--foreground)]">
              You have no assignments at the moment. Keep up the good work!
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {assignments.map((item, idx) => (
              <motion.div
                key={item._id}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                variants={fadeUp}
                custom={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-[var(--card-foreground)] rounded-xl shadow-lg p-4 transition-transform cursor-pointer"
              >
                <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">{item.title}</h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-2">{item.course}</p>
                <p className="text-sm text-[var(--foreground)] mb-2">
                  <span className="font-medium">Due:</span>{" "}
                  {new Date(item.dueDate).toLocaleDateString()}
                </p>
                <div>{getStatusBadge(item.status)}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
