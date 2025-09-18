"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function StudentForm() {
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
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Form submitted successfully!");
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
        setSuccess("Something went wrong. Try again!");
      }
    } catch (err) {
      setSuccess("Error: Could not submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Top Button */}
      <button className="mb-6 px-4 py-2 border border-primary rounded-md bg-white shadow hover:bg-popover-foreground hover:dark:bg-popover-foreground  text-primary font-medium">
        Contact Form
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-primary">
        Student Information
      </h2>
      <p className="text-center dark:text-white text-base-100  max-w-xl mb-6">
        Please fill the form below to help us better understand your needs.
      </p>

      {/* Social Icons */}
      <div className="flex space-x-4 mb-6">
        <a
          href="#"
          className="p-2 bg-white shadow rounded-md hover:bg-accent-foreground  text-primary"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="p-2 bg-white shadow rounded-md hover:bg-accent-foreground text-primary"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="p-2 bg-white shadow rounded-md hover:bg-accent-foreground text-primary"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-md p-6 w-full max-w-3xl border border-secondary"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="parentName"
            placeholder="Enter Parent Name"
            value={form.parentName}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="text"
            name="studentName"
            placeholder="Enter Student Name"
            value={form.studentName}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            name="studentAge"
            placeholder="Enter Student Age"
            value={form.studentAge}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <select
            name="program"
            value={form.program}
            onChange={handleChange}
            className="w-full border border-accent rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Program</option>
            <option value="Science">Science</option>
            <option value="Math">Math</option>
            <option value="Arts">Arts</option>
          </select>
        </div>

        <textarea
          name="message"
          placeholder="Enter your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border border-accent rounded-md p-2 mb-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit!"}
        </button>

        {success && (
          <p className="text-center mt-4 text-sm text-green-600">{success}</p>
        )}
      </form>
    </section>
  );
}
