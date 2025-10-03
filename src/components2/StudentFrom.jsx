// "use client";

// import { useState } from "react";
// import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

// export default function StudentForm() {
//   const [form, setForm] = useState({
//     parentName: "",
//     email: "",
//     phone: "",
//     studentName: "",
//     studentAge: "",
//     program: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [feedback, setFeedback] = useState({ type: "", text: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFeedback({ type: "", text: "" });

//     if (Number(form.studentAge) < 10) {
//       setFeedback({ type: "error", text: "Student age must be at least 10 years old." });
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         setFeedback({ type: "success", text: "Form submitted successfully!" });
//         setForm({
//           parentName: "",
//           email: "",
//           phone: "",
//           studentName: "",
//           studentAge: "",
//           program: "",
//           message: "",
//         });
//       } else {
//         setFeedback({ type: "error", text: "Something went wrong. Try again!" });
//       }
//     } catch (err) {
//       setFeedback({ type: "error", text: "Error: Could not submit form." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="flex flex-col items-center justify-center py-16 px-4">
//       {/* Top Button */}
//       <button className="mb-8 px-6 py-3 border border-primary rounded-lg bg-white shadow hover:bg-primary hover:text-white text-primary font-medium transition">
//         Contact Form
//       </button>

//       {/* Title */}
//       <h2 className="text-3xl font-bold text-primary">Student Information</h2>
//       <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl my-3">
//         If you have specific questions or wish to request more information about Little Learners Academy, please complete the contact form below. Kindly provide the following details to help us better understand your needs.
//       </p>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-muted dark:bg-muted shadow-2xl rounded-xl mt-12 p-10 w-full max-w-5xl border-2 border-primary flex flex-col space-y-6"
//       >
//         {/* Social Icons (unchanged) */}
//         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
//           <a href="#" aria-label="Facebook" className="py-3 px-5 bg-secondary shadow rounded-sm hover:bg-accent text-black">
//             <FaFacebookF />
//           </a>
//           <a href="#" aria-label="Twitter" className="py-3 px-5 bg-secondary shadow rounded-sm hover:bg-accent text-black">
//             <FaTwitter />
//           </a>
//           <a href="#" aria-label="Instagram" className="py-3 px-5 bg-secondary shadow rounded-sm hover:bg-accent text-black">
//             <FaInstagram />
//           </a>
//         </div>

//         {/* Inputs */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Parent Name</label>
//             <input
//               type="text"
//               name="parentName"
//               placeholder="Enter Parent Name"
//               value={form.parentName}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email Address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={form.phone}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Student Name</label>
//             <input
//               type="text"
//               name="studentName"
//               placeholder="Enter Student Name"
//               value={form.studentName}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Student Age</label>
//             <input
//               type="number"
//               name="studentAge"
//               placeholder="Enter Student Age"
//               value={form.studentAge}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//               min="10"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Program</label>
//             <select
//               name="program"
//               value={form.program}
//               onChange={handleChange}
//               className="w-full border border-popover rounded-md p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             >
//               <option value="">Select Program</option>
//               <option value="Science">Science</option>
//               <option value="Math">Math</option>
//               <option value="Arts">Arts</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">Message</label>
//           <textarea
//             name="message"
//             placeholder="Enter your Message"
//             value={form.message}
//             onChange={handleChange}
//             className="w-full border border-popover rounded-md p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
//             rows={6}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 rounded-md transition disabled:opacity-50"
//         >
//           {loading ? "Submitting..." : "Submit!"}
//         </button>

//         {feedback.text && (
//           <p
//             className={`text-center mt-4 text-sm ${feedback.type === "success" ? "text-green-600" : "text-red-600"
//               }`}
//           >
//             {feedback.text}
//           </p>
//         )}
//       </form>
//     </section>
//   );
// }