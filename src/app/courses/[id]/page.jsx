"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FaUsers, FaBookOpen } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        if (res.data.success) {
          setCourse(res.data.data);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center min-h-screen flex justify-center items-center">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-24 px-4 lg:px-0">
      {/* Course Image */}
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-6 left-6 bg-primary text-white px-3 py-1 text-sm rounded-md">
          {course.category}
        </span>
      </div>

      {/* Course Details */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-popover">{course.title}</h1>
        <p className="text-gray-600 text-lg">{course.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-orange-500" /> <span>{course.lectures} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-orange-500" /> <span>{course.students} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineWatchLater className="text-orange-500" /> <span>{course.duration} Year</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-white bg-primary px-5 py-2 rounded-lg">
            ${course.price}
          </span>
        </div>
      </div>
    </div>
  );
}