"use client";

import { useState } from "react";
import Image from "next/image";

export default function SendMessage() {
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    studentName: "",
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
          studentName: "",
          message: "",
        });
      } else {
        setFeedback({
          type: "error",
          text: "Something went wrong. Try again!",
        });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Error: Could not submit form." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-xl">
          {/* Orange Shape */}
          <div className="absolute top-0 left-0 h-full w-[120px] bg-[var(--primary)] [clip-path:polygon(0_0,100%_0,20%_100%,0%_100%)] rounded-l-xl z-12"></div>

          {/* Image */}
          <Image
            src="/assets/contact/01.jpg"
            alt="Students"
            fill
            className="object-cover rounded-l-xl"
            priority
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
                feedback.type === "success" ? "text-green-600" : "text-red-600"
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
