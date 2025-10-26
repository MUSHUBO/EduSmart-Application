"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Clock,
  Languages,
  Signal,
  MapPin,
  Award,
  DollarSign,
  Zap, // Used for Category icon
  CheckCircle, // Used for Assessments icon
  ClipboardList, // Used for Quizzes icon
} from "lucide-react";

// Helper component for the card list items (like in the images)
const FeatureListItem = ({ Icon, label, value }) => (
  <li className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
    <div className="flex items-center gap-3">
      {/* Consistent icon styling */}
      <Icon className="text-secondary flex-shrink-0" size={20} />
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
  </li>
);


export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        // Assuming your API endpoint is correct for fetching by ID
        const res = await axios.get(`/api/courses/${id}`);
        if (res.data.success && res.data.data) {
          // Normalize the incoming data to simple types if MongoDB numbers are used
          const rawData = res.data.data;
          const normalizedData = {
            ...rawData,
            price: rawData.price?.$numberInt ? Number(rawData.price.$numberInt) : (Number(rawData.price) || 0),
            lectures: rawData.lectures?.$numberInt ? Number(rawData.lectures.$numberInt) : (Number(rawData.lectures) || 0),
            quizzes: rawData.quizzes?.$numberInt ? Number(rawData.quizzes.$numberInt) : (Number(rawData.quizzes) || 0),
            students: rawData.students?.$numberInt ? Number(rawData.students.$numberInt) : (Number(rawData.students) || 0),
            // Convert comma-separated string back to array if needed, otherwise use the array from form
            galleryImages: Array.isArray(rawData.galleryImages)
              ? rawData.galleryImages
              : (rawData.galleryImages || "").split(',').map(s => s.trim()).filter(s => s.length > 0),
            // Use instructor and teacherImage from the data
            teacherName: rawData.instructor,
          };

          setCourse(normalizedData);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <p className="text-center min-h-screen flex justify-center items-center text-popover">
        Loading Course Details...
      </p>
    );
  if (error || !course)
    return (
      <p className="text-center mt-20 text-xl text-red-500">{error || "Course data is unavailable."}</p>
    );

  // Use a sensible default image if not provided
  const mainImage = course.image || "/images/default-course.jpg";
  const teacherAvatar = course.teacherImage || "/images/default-avatar.jpg";

  // Format Price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(course.price);

  return (
    <div className="bg-background pt-16 min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">

          {/* Left Column: Course Image & Banner */}
          <div className="lg:col-span-2 relative w-full h-[450px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={mainImage}
              alt={course.title}
              fill
              className="object-cover"
            />
            {/* Category Tag */}
            <span className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 text-sm font-semibold rounded-lg shadow-md">
              {course.category}
            </span>
          </div>

          {/* Right Column: Course Info Card (FIXED for Dark Mode) */}
          <div className="lg:col-span-1 bg-white dark:bg-card rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-popover mb-6 border-b-2 border-primary/50 pb-2">
              Course Info
            </h3>

            <div className="space-y-6 flex-grow">

              {/* Teacher Info */}
              <div className="flex items-center gap-4 border-b dark:border-gray-800 pb-4">
                <div className="relative w-12 h-12">
                  <Image src={teacherAvatar} alt="Teacher" fill className="rounded-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-gray-500 dark:text-muted-foreground">Teacher</p>
                  <p className="font-bold text-gray-900 dark:text-popover">{course.instructor}</p>
                </div>
              </div>

              {/* Other Info Items */}
              <ul className="space-y-4">
                <FeatureListItem Icon={Zap} label="Category" value={course.category} />
                <FeatureListItem Icon={Users} label="Students Limit" value={`${course.students} Students`} />
                <FeatureListItem Icon={Clock} label="Duration" value={course.duration} />
                <FeatureListItem Icon={DollarSign} label="Course Fees" value={formattedPrice} />
              </ul>
            </div>

            {/* Enroll Button */}
            <div className="mt-8 pt-4 border-t dark:border-gray-800">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Enroll Now <Users size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Second Row: Details and Features --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">

          {/* Left Column: Title, Description, and Gallery */}
          <div className="lg:col-span-2">

            {/* Title & Secondary Stats */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-popover mb-4">
                {course.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-secondary" size={18} /> <span>{course.lectures} Lectures</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Using students count as Enrolled count for display */}
                  <Users className="text-secondary" size={18} /> <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-secondary" size={18} /> <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-popover mb-4 border-b dark:border-gray-700 pb-2">Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-12 whitespace-pre-wrap">
              {course.description || "No detailed description provided."}
            </p>

            {/* Course Gallery */}
            {course.galleryImages.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-popover mb-6 border-b dark:border-gray-700 pb-2">Course Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {course.galleryImages.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative w-full h-48 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
                    >
                      <Image
                        src={imgSrc}
                        alt={`Course gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column: Course Features Card (FIXED for Dark Mode) */}
          <div className="lg:col-span-1 h-fit bg-white dark:bg-card rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-popover mb-6 border-b-2 border-primary/50 pb-2">
              Course Features
            </h3>

            <ul className="space-y-0">
              <FeatureListItem Icon={BookOpen} label="Lectures" value={course.lectures} />
              <FeatureListItem Icon={ClipboardList} label="Quizzes" value={course.quizzes} />
              <FeatureListItem Icon={Clock} label="Duration" value={course.duration} />
              <FeatureListItem Icon={Languages} label="Language" value={course.language} />
              <FeatureListItem Icon={Signal} label="Skill Level" value={course.skillLevel} />
              <FeatureListItem Icon={MapPin} label="Location" value={course.location} />
              <FeatureListItem Icon={Users} label="Students Limit" value={course.students} />
              <FeatureListItem Icon={Award} label="Certificate" value={course.certificate} />
              <FeatureListItem Icon={CheckCircle} label="Assessments" value={course.assessments} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}