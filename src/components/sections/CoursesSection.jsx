"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        if (res.data.success) {
          setCourses(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      } 
    };
    fetchCourses();
  }, []);
  console.log(courses)
  if (loading) return <p className="text-center min-h-screen flex justify-center items-center">Loading...</p>;

  return (
    <div className="py-16 lg:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-bold mb-6">Let's Check Our <span className="text-primary">Courses</span> </h2>
        <p className="">It is a long established fact that a reader will be distracted by the readable <br /> content of a page when looking at its layout.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {courses.map((course) => (

          <Link key={course._id} href={`/courses/${course._id}`} className="group">
            <div
              key={course._id}
              className="rounded-2xl overflow-hidden   bg-muted  
            shadow-lg hover:shadow-lg   
            hover:shadow-accent-foreground dark:hover:shadow-muted-foreground   
            transition"
            >
              {/* Image */}
              <div className="relative p-4">
                
                {/* <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={500}
                  className="w-full h-[220px] object-cover rounded-lg"
                /> */}
                <span className="absolute top-6 left-6 bg-primary text-white px-3 py-1 text-sm rounded-md">
                  {course.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Lessons + Rating */}
                <div className="flex justify-between items-center mb-3 text-[16px] text-gray-600 text-sm">
                  <div className="flex  items-center gap-1">
                    <FaBookOpen className="text-orange-500" />
                    <span>{course.lectures} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-secondary" />
                    <span>(4.0)</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl text-popover font-bold mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {course.description.slice(0, 130)}...
                </p>

                <div className='divider divide-gray-800'></div>

                {/* Bottom info */}
                <div className="flex justify-between items-center font-medium">
                  <div className="flex items-center gap-1 text-gray-600">
                    <FaUsers className="text-orange-500" />
                    <span>{course.students} Seats</span>
                  </div>
                  <div className="flex font-medium items-center gap-1 text-gray-600">
                    <MdOutlineWatchLater className="text-orange-500" />
                    <span>{course.duration} Year</span>
                  </div>
                  <span className="bg-primary text-white px-3 py-1 rounded-lg">
                    ${course.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
}