"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AddNoticeForm() {
  const [activeTab, setActiveTab] = useState("notice");
  const [loading, setLoading] = useState(false);

  const [noticeData, setNoticeData] = useState({
    date: "",
    title: "",
    department: "",
    download: "",
    view: "",
  });

  const [examData, setExamData] = useState({
    date: "",
    title: "",
    class: "",
    download: "",
    view: "",
  });

  const departments = [
    "sports",
    "administration",
    "cultural",
    "science",
    "it",
    "academic",
  ];

  const classOptions = ["6", "7", "8", "9", "10", "11", "12"];

  // Handle change
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "notice")
      setNoticeData((prev) => ({ ...prev, [name]: value }));
    else setExamData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === "notice") {
        const { title, date, department } = noticeData;
        if (!title || !date || !department) {
          toast.error("Please fill all required fields for notice!");
          setLoading(false);
          return;
        }
        await axios.post("/api/notice/add-notice", noticeData);
        toast.success("Notice added successfully!");
        setNoticeData({
          date: "",
          title: "",
          department: "",
          download: "",
          view: "",
        });
      } else {
        const { title, date, class: classValue } = examData;
        if (!title || !date || !classValue) {
          toast.error("Please fill all required fields for exam!");
          setLoading(false);
          return;
        }
        await axios.post("/api/notice/add-exam", examData);
        toast.success("Exam added successfully!");
        setExamData({
          date: "",
          title: "",
          class: "",
          download: "",
          view: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
      <Toaster position="top-center" />
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("notice")}
          className={`btn ${
            activeTab === "notice"
              ? "btn-primary"
              : "btn-outline border-gray-300"
          }`}
        >
          Notice
        </button>
        <button
          onClick={() => setActiveTab("exam")}
          className={`btn ${
            activeTab === "exam"
              ? "btn-primary"
              : "btn-outline border-gray-300"
          }`}
        >
          Exam
        </button>
      </div>

      {/* Notice Form */}
      {activeTab === "notice" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 text-xl font-semibold text-center mb-2">
            Add Notice
          </h2>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={noticeData.date}
              onChange={(e) => handleChange(e, "notice")}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={noticeData.department}
              onChange={(e) => handleChange(e, "notice")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep.charAt(0).toUpperCase() + dep.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={noticeData.title}
              onChange={(e) => handleChange(e, "notice")}
              placeholder="Enter notice title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Download */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Download URL</label>
            <input
              type="url"
              name="download"
              value={noticeData.download}
              onChange={(e) => handleChange(e, "notice")}
              placeholder="https://drive.google.com/uc?export=download&id=..."
              className="input input-bordered w-full"
            />
          </div>

          {/* View */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">View URL</label>
            <input
              type="url"
              name="view"
              value={noticeData.view}
              onChange={(e) => handleChange(e, "notice")}
              placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full md:w-auto"
            >
              {loading ? "Submitting..." : "Submit Notice"}
            </button>
          </div>
        </form>
      )}

      {/* Exam Form */}
      {activeTab === "exam" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 text-xl font-semibold text-center mb-2">
            Add Exam
          </h2>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={examData.date}
              onChange={(e) => handleChange(e, "exam")}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Class */}
          <div>
            <label className="block text-gray-700 mb-1">Class</label>
            <select
              name="class"
              value={examData.class}
              onChange={(e) => handleChange(e, "exam")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={examData.title}
              onChange={(e) => handleChange(e, "exam")}
              placeholder="Enter exam title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Download */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Download URL</label>
            <input
              type="url"
              name="download"
              value={examData.download}
              onChange={(e) => handleChange(e, "exam")}
              placeholder="https://drive.google.com/uc?export=download&id=..."
              className="input input-bordered w-full"
            />
          </div>

          {/* View */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">View URL</label>
            <input
              type="url"
              name="view"
              value={examData.view}
              onChange={(e) => handleChange(e, "exam")}
              placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full md:w-auto"
            >
              {loading ? "Submitting..." : "Submit Exam"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
