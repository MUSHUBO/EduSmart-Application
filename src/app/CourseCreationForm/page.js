"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/Hooks/UseAuth/UseAuth";
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
const IconInput = ({ icon: Icon, label, name, value, onChange, placeholder, type = "text", required = true, disabled = false }) => ( // required set to true by default
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
                          ${disabled ? 'cursor-not-allowed bg-gray-100 dark:bg-muted-foreground/20' : ''}`}
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
        required // Added required attribute
      >
        <option value="" disabled>Select option</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {/* Custom chevron (Right Icon) */}
      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-muted-foreground pointer-events-none z-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
    image: "", // Main course image
    galleryImages: "", // Comma-separated string
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
      setFormData(prevData => ({
        ...prevData,
        instructor: user.displayName || user.name || "",
        teacherImage: user.photoURL || "",
      }));
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-center min-h-screen flex justify-center items-center">Loading...</p>;
  if (!user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The validation is handled by the 'required' attribute on the inputs,
    // but the final data clean-up still needs to happen here.
    const galleryArray = formData.galleryImages
      .split(",")
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const dataToSend = {
      ...formData,
      galleryImages: galleryArray,
      price: Number(formData.price) || 0,
      lectures: Number(formData.lectures) || 0,
      quizzes: Number(formData.quizzes) || 0,
      students: Number(formData.students) || 0,
      gmail: user?.email,
    };

    try {
      const res = await axios.post("/api/courses", dataToSend);

      if (res.data.success) {
        toast.success("Course added successfully! 🎉", {
          style: { background: "#22c55e", color: "#fff" },
        });

        // Reset form but retain auto-populated data
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
    <div className="py-12 my-16 bg-background">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
        {/* HEADER WITH ICON (FIXED) */}
        <h2 className="text-4xl font-extrabold text-center mb-10 text-popover border-b pb-4 flex items-center justify-center gap-3">
          <PlusCircle size={32} className="text-primary" />
          Add New Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 text-popover"
        >
          {/* 1. Basic Info & Pricing */}
          <div className="space-y-4 border p-6 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-primary">
              <Briefcase size={22} /> Course Identity
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <IconInput icon={BookOpen} label="Course Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Advanced React Development" />

              <IconInput
                icon={User}
                label="Instructor Name (From Profile)"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Fetched automatically..."
                disabled
                required={true} // Explicitly required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <IconSelect icon={Layers} label="Category" name="category" value={formData.category} onChange={handleChange} options={courseCategories} />

              <IconInput icon={DollarSign} label="Course Fees (USD)" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 499" type="number" />
            </div>

            <IconInput
              icon={Zap}
              label="Instructor Image URL (Avatar - From Profile)"
              name="teacherImage"
              value={formData.teacherImage}
              onChange={handleChange}
              placeholder="Fetched automatically..."
              disabled
              required={true} // Explicitly required
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
              <IconInput icon={Clock} label="Duration (e.g., 4 Years)" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 4 Years" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <IconInput icon={Globe} label="Language" name="language" value={formData.language} onChange={handleChange} placeholder="e.g. English" />
              <IconInput icon={Signal} label="Skill Level" name="skillLevel" value={formData.skillLevel} onChange={handleChange} placeholder="e.g. Basic" />
              <IconInput icon={MapPin} label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. On Campus" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <IconInput icon={Users} label="Students Limit" name="students" value={formData.students} onChange={handleChange} placeholder="e.g. 50" type="number" />
              <IconSelect icon={Award} label="Certificate" name="certificate" value={formData.certificate} onChange={handleChange} options={["Yes", "No"]} />
              <IconSelect icon={ClipboardList} label="Assessments" name="assessments" value={formData.assessments} onChange={handleChange} options={["Yes", "No"]} />
            </div>
          </div>

          {/* 3. Images and Description */}
          <div className="space-y-4 border p-6 rounded-lg bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2 text-primary">
              <ImageIcon size={22} /> Media & Content
            </h3>

            <IconInput icon={ImageIcon} label="Main Course Image URL" name="image" value={formData.image} onChange={handleChange} placeholder="Paste main course image URL" />

            {/* Gallery URLs Textarea (Manual styling for textarea) */}
            <div>
              <label className="block mb-1 text-popover font-semibold">Course Gallery URLs (Comma Separated)</label>
              <textarea
                name="galleryImages"
                placeholder="Paste 3-4 image URLs, separated by a comma (e.g., url1, url2, url3)"
                value={formData.galleryImages}
                onChange={handleChange}
                className="w-full p-3 
                               bg-white dark:bg-background text-foreground 
                               border border-gray-300 dark:border-muted-foreground 
                               rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                rows="3"
                required // Made required
              ></textarea>
            </div>

            {/* Description Textarea (Manual styling for textarea) */}
            <div>
              <label className="mb-1 text-popover font-semibold flex items-center gap-1">
                <MessageSquare size={18} className="text-secondary" /> Course Description
              </label>
              <textarea
                name="description"
                placeholder="Write something about the course..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 
                               bg-white dark:bg-background text-foreground 
                               border border-gray-300 dark:border-muted-foreground 
                               rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                rows="4"
                required // Made required
              ></textarea>
            </div>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold rounded-lg transition-all 
                       bg-secondary text-white hover:bg-secondary/90 
                       shadow-md shadow-secondary/50 focus:outline-none"
          >
            Submit New Course
          </button>
        </form>
      </div>
    </div>
  );
}