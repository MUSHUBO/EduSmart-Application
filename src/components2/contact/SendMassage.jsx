"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function SendMassage() {
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    studentName: "",
    studentAge: "",
    program: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", text: "" });

    if (Number(form.studentAge) < 10) {
      setFeedback({
        type: "error",
        text: "Student age must be at least 10 years old.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFeedback({ type: "success", text: "Form submitted successfully!" });
        setForm({
          parentName: "",
          email: "",
          phone: "",
          studentName: "",
          studentAge: "",
          program: "",
          message: "",
        });
      } else {
        setFeedback({ type: "error", text: "Something went wrong. Try again!" });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Error: Could not submit form." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="relative w-full h-[400px] lg:h-full">
       
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-[var(--secondary)] skew-y-6 rounded-tr-lg rounded-br-lg z-10"></div>

          <Image
            src="/assets/contact/03.jpeg" 
            alt="Students"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="bg-white dark:bg-[var(--muted)] shadow-lg rounded-xl p-8 lg:p-10 relative">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page randomised words which don’t look
            even slightly when looking at its layout.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="parentName"
                placeholder="Your Name"
                value={form.parentName}
                onChange={handleChange}
                className="border rounded-md p-3 w-full focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-md p-3 w-full focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>

            <input
              type="text"
              name="studentName"
              placeholder="Your Subject"
              value={form.studentName}
              onChange={handleChange}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-[var(--primary)]"
              required
            />

            <textarea
              name="message"
              placeholder="Write Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="border rounded-md p-3 w-full focus:ring-2 focus:ring-[var(--primary)]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white px-6 py-3 rounded-md font-medium transition"
            >
              {loading ? "Submitting..." : "SEND MESSAGE"}
            </button>
          </form>

          {feedback.text && (
            <p
              className={`mt-4 text-sm ${
                feedback.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedback.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
