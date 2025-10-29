"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";
import { Bars } from "react-loader-spinner"; // ✅ added loader
import {
  BookOpen,
  User,
  DollarSign,
  Briefcase,
  Layers,
  Clock,
  Globe,
  Signal,
  MapPin,
  Users,
  Award,
  ClipboardList,
  Image as ImageIcon,
  MessageSquare,
  Zap,
  PlusCircle,
} from "lucide-react";

// List of common categories for the dropdown
const courseCategories = [
  "Science & Engineering",
  "Web Development",
  "Data Science",
  "Design & Arts",
  "Business & Finance",
  "Health & Fitness",
  "Marketing",
  "Languages",
  "Other",
];

// Reusable Input Component
const IconInput = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
  disabled = false,
}) => (
  <div>
    <label className="block mb-1 text-popover font-semibold">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary z-10" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-12 pl-10 pr-4 
          bg-white dark:bg-background text-foreground 
          border border-gray-300 dark:border-muted-foreground 
          rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors 
          ${disabled ? "cursor-not-allowed bg-gray-100 dark:bg-muted-foreground/20" : ""}`}
        required={required}
        disabled={disabled}
      />
    </div>
  </div>
);

// Reusable Select Component
const IconSelect = ({ icon: Icon, label, name, value, onChange, options }) => (
  <div>
    <label className="block mb-1 text-popover font-semibold">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary z-20 pointer-events-none" />
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 pl-10 pr-10 
          bg-white dark:bg-background text-foreground 
          border border-gray-300 dark:border-muted-foreground rounded-lg 
          focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
        required
      >
        <option value="" disabled>
          Select option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Custom chevron icon */}
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-muted-foreground pointer-events-none z-20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

export default function AddCourse() {
  const { loading, user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    teacherImage: "",
    category: "",
    price: "",
    description: "",
    image: "",
    galleryImages: "",
    lectures: "",
    quizzes: "",
    duration: "",
    language: "",
    skillLevel: "",
    location: "",
    students: "",
    certificate: "",
    assessments: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/AddCourse`);
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        instructor: user.displayName || user.name || "",
        teacherImage: user.photoURL || "",
      }));
    }
  }, [user, loading, router]);

  // ✅ Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="loading"
          visible={true}
        />
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const galleryArray = formData.galleryImages
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const dataToSend = {
      ...formData,
      galleryImages: galleryArray,
      price: Number(formData.price) || 0,
      lectures: Number(formData.lectures) || 0,
      quizzes: Number(formData.quizzes) || 0,
      students: Number(formData.students) || 0,
    };

    try {
      const res = await axios.post("/api/courses", dataToSend);

      if (res.data.success) {
        toast.success("Course added successfully! 🎉", {
          style: { background: "#22c55e", color: "#fff" },
        });

        setFormData({
          title: "",
          instructor: formData.instructor,
          teacherImage: formData.teacherImage,
          category: "",
          price: "",
          description: "",
          image: "",
          galleryImages: "",
          lectures: "",
          quizzes: "",
          duration: "",
          language: "",
          skillLevel: "",
          location: "",
          students: "",
          certificate: "",
          assessments: "",
        });
      } else {
        toast.error("Failed to add course!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred!");
    }
  };

  return (
    <div className="my-6 bg-background">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-popover border-b pb-4 flex items-center justify-center gap-3">
          <PlusCircle size={32} className="text-primary" />
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8 text-popover">
          {/* 1. Basic Info */}
          <div className="space-y-4 border p-6 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-primary">
              <Briefcase size={22} /> Course Identity
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <IconInput
                icon={BookOpen}
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Advanced React Development"
              />

              <IconInput
                icon={User}
                label="Instructor Name (From Profile)"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Fetched automatically..."
                disabled
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <IconSelect
                icon={Layers}
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={courseCategories}
              />

              <IconInput
                icon={DollarSign}
                label="Course Fees (USD)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 499"
                type="number"
              />
            </div>

            <IconInput
              icon={Zap}
              label="Instructor Image URL (From Profile)"
              name="teacherImage"
              value={formData.teacherImage}
              onChange={handleChange}
              placeholder="Fetched automatically..."
              disabled
            />
          </div>

          {/* 2. Course Features */}
          <div className="space-y-4 border p-6 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-primary">
              <ClipboardList size={22} /> Course Specifications
            </h3>

            <div className="grid sm:grid-cols-3 gap-4">
              <IconInput icon={BookOpen} label="Lectures" name="lectures" value={formData.lectures} onChange={handleChange} placeholder="e.g. 20" type="number" />
              <IconInput icon={ClipboardList} label="Quizzes" name="quizzes" value={formData.quizzes} onChange={handleChange} placeholder="e.g. 12" type="number" />
              <IconInput icon={Clock} label="Duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 4 Months" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <IconInput icon={Globe} label="Language" name="language" value={formData.language} onChange={handleChange} placeholder="e.g. English" />
              <IconInput icon={Signal} label="Skill Level" name="skillLevel" value={formData.skillLevel} onChange={handleChange} placeholder="e.g. Beginner" />
              <IconInput icon={MapPin} label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Online" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <IconInput icon={Users} label="Students Limit" name="students" value={formData.students} onChange={handleChange} placeholder="e.g. 50" type="number" />
              <IconSelect icon={Award} label="Certificate" name="certificate" value={formData.certificate} onChange={handleChange} options={["Yes", "No"]} />
              <IconSelect icon={ClipboardList} label="Assessments" name="assessments" value={formData.assessments} onChange={handleChange} options={["Yes", "No"]} />
            </div>
          </div>

          {/* 3. Media & Description */}
          <div className="space-y-4 border p-6 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-primary">
              <ImageIcon size={22} /> Media & Content
            </h3>

            <IconInput icon={ImageIcon} label="Main Course Image URL" name="image" value={formData.image} onChange={handleChange} placeholder="Paste main course image URL" />

            <div>
              <label className="block mb-1 text-popover font-semibold">
                Course Gallery URLs (Comma Separated)
              </label>
              <textarea
                name="galleryImages"
                placeholder="Paste 3-4 image URLs separated by commas"
                value={formData.galleryImages}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-background text-foreground border border-gray-300 dark:border-muted-foreground rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="mb-1 text-popover font-semibold flex items-center gap-1">
                <MessageSquare size={18} className="text-secondary" /> Course Description
              </label>
              <textarea
                name="description"
                placeholder="Write something about the course..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-background text-foreground border border-gray-300 dark:border-muted-foreground rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-bold rounded-lg transition-all bg-secondary text-white hover:bg-secondary/90 shadow-md shadow-secondary/50 focus:outline-none"
          >
            Submit New Course
          </button>
        </form>
      </div>
    </div>
  );
}
