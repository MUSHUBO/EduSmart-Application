"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Users, Clock, DollarSign } from "lucide-react";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses/all");
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch all courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="w-11/12 mx-auto py-14 pt-4 bg-background min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary flex items-center justify-center gap-3">
        <BookOpen size={36} /> Explore All Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-xl text-gray-500 mt-38 dark:text-gray-300">No courses found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:border-primary flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 text-sm rounded-md">
                  {course.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                {/* Lessons & Rating */}
                <div className="flex justify-between items-center text-[15px] text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2 font-medium">
                    <BookOpen size={18} className="text-primary" />
                    {course.lectures || 0} Lessons
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    {course.rating || 4.5}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300 leading-snug">
                  {course.title?.slice(0, 32) || "No title available"}
                </h3>

                {/* Description */}
                <p className="text-[16px] text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {course.description?.slice(0, 125) || "No description available."}...
                </p>

                {/* Divider */}
                <hr className="my-3 border-gray-200 dark:border-gray-600" />

                {/* Seats, Duration, Price */}
                <div className="flex justify-between items-center text-[15px] text-gray-700 dark:text-gray-200 font-medium mb-2">
                  <span className="flex items-center gap-2">
                    <Users size={18} className="text-primary" />
                    {course.students || 0} Seats
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    {course.duration || "N/A"} Months
                  </span>
                  <span className="flex bg-primary text-black items-center px-2 py-1 gap-1 rounded-lg font-semibold">
                    <DollarSign size={18} />
                    {course.price || 0}
                  </span>
                </div>

                {/* Horizontal Line */}
                <hr className="border-gray-300 dark:border-gray-600 my-2" />

                {/* Details Button */}
                <Link
                  href={`/courses/${course._id}`}
                  className="mt-auto inline-block text-center w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;