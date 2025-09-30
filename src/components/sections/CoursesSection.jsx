"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        if (res.data.success) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-16 bg-muted">
      <h2 className="text-3xl font-bold text-center mb-10">Our Popular Courses</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 text-sm rounded-md">
                {course.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Lessons + Rating */}
              <div className="flex justify-between items-center mb-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <FaBookOpen className="text-orange-500" />
                  <span>{course.lectures} Lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>(4.0)</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4">
                {course.description.slice(0, 80)}...
              </p>

              {/* Bottom info */}
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-1 text-gray-600">
                  <FaUsers className="text-orange-500" />
                  <span>{course.students} Seats</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MdOutlineWatchLater className="text-orange-500" />
                  <span>{course.duration}</span>
                </div>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-lg">
                  ${course.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}