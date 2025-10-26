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
  CalendarDays,
  DollarSign,
  User,
  Zap, // Used for Category icon
  CheckCircle, // Used for Certificate icon in the Features card
  ClipboardList, // Used for Assessments icon
} from "lucide-react";

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

  if (loading)
    return (
      <p className="text-center min-h-screen flex justify-center items-center">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500">{error}</p>
    );

  // --- DUMMY DATA (Ensure your API provides these or adjust accordingly) ---
  const dummyCourse = {
    ...course,
    quizzes: 12,
    language: "English",
    skillLevel: "Basic",
    location: "On Campus",
    certificate: "Yes",
    assessments: "Yes",
    teacherName: "Frank Mitchell",
    enrolledStudents: 50,
    courseTime: "04 Years",
    courseFees: 20000,
    teacherImage: "/images/teacher-avatar.jpg", // Placeholder for teacher image
    galleryImages: [
      "/images/course-gallery-1.jpg",
      "/images/course-gallery-2.jpg",
      "/images/course-gallery-3.jpg",
    ],
  };
  // --- END DUMMY DATA ---

  // Helper function for the card list items (like in the images)
  const FeatureListItem = ({ Icon, label, value }) => (
    <li className="flex items-center justify-between text-gray-700 py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <Icon className="text-secondary" size={20} />
        <span className="font-medium">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </li>
  );

  // Helper for Course Info items
  const InfoItem = ({ Icon, label, value, isAvatar = false }) => (
    <div className="flex items-center gap-3 text-gray-700">
      <div className="p-3 rounded-full bg-secondary/10">
        {isAvatar ? (
          <Image src={value} alt={label} width={20} height={20} className="rounded-full object-cover" />
        ) : (
          <Icon className="text-secondary" size={20} />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase text-gray-500">{label}</span>
        <span className="font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );


  return (
    <div className="bg-background pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">

          
          
          {/* Course Image */}
          <div className="lg:col-span-2 relative w-full h-[450px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={dummyCourse.image}
              alt={dummyCourse.title}
              fill
              className="object-cover"
            />
            <span className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 text-sm font-semibold rounded-lg shadow-md">
              {dummyCourse.category}
            </span>
          </div>

          {/* Course Info Card (Right) */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary/50 pb-2">
              Course Info
            </h3>

            <div className="space-y-6 flex-grow">

              {/* Teacher Info */}
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="relative w-12 h-12">
                  <Image src={dummyCourse.teacherImage} alt="Teacher" fill className="rounded-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-gray-500">Teacher</p>
                  <p className="font-bold text-gray-900">{dummyCourse.teacherName}</p>
                </div>
              </div>

              {/* Other Info Items */}
              <ul className="space-y-4">
                <FeatureListItem Icon={Zap} label="Category" value={dummyCourse.category} />
                <FeatureListItem Icon={Users} label="Enrolled" value={`${dummyCourse.enrolledStudents} Students`} />
                <FeatureListItem Icon={Clock} label="Course Time" value={dummyCourse.courseTime} />
                <FeatureListItem Icon={DollarSign} label="Course Fees" value={`$${Number(dummyCourse.courseFees).toLocaleString()}`} />
              </ul>
            </div>

            {/* Price & Button */}
            <div className="mt-8 pt-4 border-t border-gray-100">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Enroll Now <Users size={20} />
              </button>
            </div>
          </div>
        </div>

        
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">

          {/* Left Column: Title, Description, and Gallery */}
          <div className="lg:col-span-2">

            {/* Title & Secondary Stats */}
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {dummyCourse.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-secondary" size={18} /> <span>{dummyCourse.lectures} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-secondary" size={18} /> <span>{dummyCourse.enrolledStudents} Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-secondary" size={18} /> <span>{dummyCourse.courseTime}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-12">
              {dummyCourse.description || "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."}
            </p>

            {/* Course Gallery */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Course Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dummyCourse.galleryImages.map((imgSrc, index) => (
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
          </div>

          {/* Right Column: Course Features Card */}
          <div className="lg:col-span-1 h-fit bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary/50 pb-2">
              Course Features
            </h3>

            <ul className="space-y-0">
              <FeatureListItem Icon={BookOpen} label="Lectures" value={dummyCourse.lectures} />
              <FeatureListItem Icon={ClipboardList} label="Quizzes" value={dummyCourse.quizzes} />
              <FeatureListItem Icon={Clock} label="Duration" value={dummyCourse.courseTime} />
              <FeatureListItem Icon={Languages} label="Language" value={dummyCourse.language} />
              <FeatureListItem Icon={Signal} label="Skill Level" value={dummyCourse.skillLevel} />
              <FeatureListItem Icon={MapPin} label="Location" value={dummyCourse.location} />
              <FeatureListItem Icon={Users} label="Students" value={dummyCourse.students} />
              <FeatureListItem Icon={Award} label="Certificate" value={dummyCourse.certificate} />
              <FeatureListItem Icon={CheckCircle} label="Assessments" value={dummyCourse.assessments} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}