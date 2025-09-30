"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    category: "",
    price: "",
    description: "",
    image: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/courses", formData);
      if (res.data.success) {
        toast.success("Course added successfully!", {
          style: { background: "#22c55e", color: "#fff" },
        });
      } else {
        toast.error("Failed to add course!");
      }

      setFormData({
        title: "",
        instructor: "",
        category: "",
        price: "",
        description: "",
        image: "",
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
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred!");
    }
  };

  return (
    <div className="py-12 my-20 bg-muted">
      {/* Toast Notification */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#012758]/50 to-secondary/50 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-white drop-shadow">
          Add New Course – EduSmart
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 font-medium text-white"
        >
          {/* Title + Instructor */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Instructor Name</label>
              <input
                type="text"
                name="instructor"
                placeholder="Instructor name"
                value={formData.instructor}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Category + Price */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Web Development"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Course Fees (USD)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter course price"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Lectures</label>
              <input
                type="number"
                name="lectures"
                placeholder="Number of lectures"
                value={formData.lectures}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Quizzes</label>
              <input
                type="number"
                name="quizzes"
                placeholder="Number of quizzes"
                value={formData.quizzes}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Duration (Years)</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 2 Years"
                value={formData.duration}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Language</label>
              <input
                type="text"
                name="language"
                placeholder="Course language"
                value={formData.language}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Skill Level</label>
              <input
                type="text"
                name="skillLevel"
                placeholder="e.g. Basic / Advanced"
                value={formData.skillLevel}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. On Campus / Online"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Students</label>
              <input
                type="number"
                name="students"
                placeholder="Total students"
                value={formData.students}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Certificate</label>
              <select
                name="certificate"
                value={formData.certificate}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Assessments</label>
              <select
                name="assessments"
                value={formData.assessments}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1">Course Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Course Description</label>
            <textarea
              name="description"
              placeholder="Write something about the course..."
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-secondary text-white text-md w-full font-semibold hover:bg-secondary/50"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}