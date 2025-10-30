"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AddNoticeForm() {
  const [activeTab, setActiveTab] = useState("notice");
  const [loading, setLoading] = useState(false);

  // --- FORM STATES ---
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

  const [eventData, setEventData] = useState({
    startDate: "",
    endDate: "",
    title: "",
    details: "",
    location: "",
    fees: "",
    image: null,
  });

  // --- OPTIONS ---
  const departments = [
    "sports",
    "administration",
    "cultural",
    "science",
    "it",
    "academic",
  ];
  const classOptions = ["6", "7", "8", "9", "10", "11", "12"];

  // --- HANDLE CHANGES ---
  const handleChange = (e, type) => {
    const { name, value, files } = e.target;
    if (type === "notice") setNoticeData((prev) => ({ ...prev, [name]: value }));
    else if (type === "exam") setExamData((prev) => ({ ...prev, [name]: value }));
    else if (type === "event") {
      if (files) setEventData((prev) => ({ ...prev, [name]: files[0] }));
      else setEventData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === "notice") {
        const { title, date, department } = noticeData;
        if (!title || !date || !department) {
          toast.error("Please fill all required fields for Notice!");
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
      }

      if (activeTab === "exam") {
        const { title, date, class: classValue } = examData;
        if (!title || !date || !classValue) {
          toast.error("Please fill all required fields for Exam!");
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

     if (activeTab === "event") {
  const { title, startDate, endDate, image, details, fees, location } = eventData;
  if (!title || !startDate || !endDate || !image) {
    toast.error("Please fill all required fields for Event!");
    setLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("details", details);
  formData.append("fees", fees);
  formData.append("location", location);
  formData.append("image", image);

  await axios.post("/api/notice/add-event", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  toast.success("Event added successfully!");
  setEventData({
    startDate: "",
    endDate: "",
    title: "",
    details: "",
    location: "",
    fees: "",
    image: null,
  });
}

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit data!");
    } finally {
      setLoading(false);
    }
  };

  // --- UI ---
  return (
    <section className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 border border-gray-200">
      <Toaster position="top-center" />

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["notice", "exam", "event"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn ${
              activeTab === tab ? "btn-primary" : "btn-outline border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ---------------- NOTICE FORM ---------------- */}
      {activeTab === "notice" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 text-xl font-semibold text-center mb-2">
            Add Notice
          </h2>

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

      {/*  EXAM FORM  */}
      {activeTab === "exam" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 text-xl font-semibold text-center mb-2">
            Add Exam
          </h2>

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

      {/* EVENT FORM */}
     {activeTab === "event" && (
  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <h2 className="md:col-span-2 text-xl font-semibold text-center mb-2">
      Add Event
    </h2>

    <div>
      <label className="block text-gray-700 mb-1">Start Date</label>
      <input
        type="date"
        name="startDate"
        value={eventData.startDate}
        onChange={(e) => handleChange(e, "event")}
        className="input input-bordered w-full"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">End Date</label>
      <input
        type="date"
        name="endDate"
        value={eventData.endDate}
        onChange={(e) => handleChange(e, "event")}
        className="input input-bordered w-full"
        required
      />
    </div>

    {/* Location + Fees same row */}
    <div>
      <label className="block text-gray-700 mb-1">Location</label>
      <input
        type="text"
        name="location"
        value={eventData.location}
        onChange={(e) => handleChange(e, "event")}
        placeholder="Event Location"
        className="input input-bordered w-full"
        required
      />
    </div>

    <div>
      <label className="block text-gray-700 mb-1">Fees</label>
      <input
        type="number"
        name="fees"
        value={eventData.fees}
        onChange={(e) => handleChange(e, "event")}
        placeholder="Entry Fees"
        className="input input-bordered w-full"
        required
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-gray-700 mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={eventData.title}
        onChange={(e) => handleChange(e, "event")}
        placeholder="Enter event title"
        className="input input-bordered w-full"
        required
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-gray-700 mb-1">Event Details</label>
      <textarea
        name="details"
        value={eventData.details}
        onChange={(e) => handleChange(e, "event")}
        placeholder="Write event details..."
        className="textarea textarea-bordered w-full"
        rows="3"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-gray-700 mb-1">Upload Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => handleChange(e, "event")}
        className="file-input file-input-bordered w-full"
        required
      />
    </div>

    <div className="md:col-span-2 text-center mt-4">
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full md:w-auto"
      >
        {loading ? "Submitting..." : "Submit Event"}
      </button>
    </div>
  </form>
)}

    </section>
  );
}
