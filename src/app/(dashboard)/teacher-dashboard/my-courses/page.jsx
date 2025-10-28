"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Users, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "@/Context/AuthContext/AuthContext";

export default function MyCreatedCourses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyCourses = async () => {
      try {
        const res = await fetch(`/api/myAddCourses?email=${user.email}`);
        const data = await res.json();

        if (data.success) setCourses(data.data);
        else console.error("Failed to fetch:", data.message);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading your created courses...
      </div>
    );

  if (courses.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-500">
        <BookOpen size={48} className="text-primary mb-4" />
        <p className="text-lg">You haven’t created any courses yet.</p>
      </div>
    );

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-10/12 mx-auto py-14 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary flex items-center justify-center gap-3">
        <BookOpen size={36} /> My Created Courses
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div
            key={course._id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:-translate-y-1 hover:border-primary flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 text-sm rounded-md">
                {course.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              {/* Top Info */}
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  {course.lectures || 0} Lessons
                </span>
                <span className="flex items-center gap-1">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  {course.rating || 4.8}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                {course.title?.slice(0, 32)}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                {course.description?.slice(0, 120)}...
              </p>

              <hr className="border-gray-200 my-3" />

              {/* Bottom Info */}
              <div className="flex justify-between items-center text-[15px] text-gray-700 font-medium mb-2">
                <span className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  {course.students || 0} Students
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  {course.duration || "N/A"}
                </span>
                <span className="flex bg-primary/90 text-white items-center px-2 py-1 gap-1 rounded-lg font-semibold">
                  <DollarSign size={18} />
                  {course.price || 0}
                </span>
              </div>

              {/* View Button */}
              <Link
                href={`/teacher-dashboard/my-created-courses/${course._id}`}
                className="mt-auto text-center w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-all"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
