
// "use client";

// import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// import { ArrowRight } from "lucide-react";

// export default function ContactInfo() {
//   return (
//     <section>
//       <div className="relative max-w-7xl mx-auto  bg-muted dark:bg-muted  text-foreground rounded-2xl shadow-md border-2 border-primary p-8 overflow-hidden">

//         <div className="absolute top-0 left-0 flex flex-wrap w-24 h-24">
//           {Array.from({ length: 16 }).map((_, i) => (
//             <div
//               key={i}
//               className={`w-6 h-6 ${
//                 i % 2 === 0 ? "bg-primary" : "bg-muted"
//               }`}
//             ></div>
//           ))}
//         </div>

//         {/* Main content grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
//           {/* Left content */}
//           <div className="space-y-5 p-2 md:p-7 text-center md:text-left">
//             <button className="btn bg-white border-primary hover:bg-black text-primary shadow-md px-6 border-b-4 border-r-4 rounded-md">
//               Contact Us <ArrowRight className="ml-2 w-4 h-4" />
//             </button>
//             <h2 className="text-2xl md:text-3xl font-bold">
//               Feel Free To Connect With Us
//             </h2>
//             <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
//               We value open communication and are eager to assist you with any
//               inquiries. Feel free to reach out to us through any of the
//               following contact methods.
//             </p>
//           </div>

//           {/* Right contact info grid */}
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="flex items-center gap-3 p-4 border border-border rounded-lg shadow-sm bg-card hover:shadow-md transition">
//               <MdEmail className="text-primary text-xl" />
//               <span className="text-foreground">eduSmart@gmail.com</span>
//             </div>

//             <div className="flex items-center gap-3 p-4 border border-border rounded-lg shadow-sm bg-card hover:shadow-md transition">
//               <FaPhoneAlt className="text-primary text-xl" />
//               <span className="text-foreground">+88 9183 23 2309</span>
//             </div>

//             <div className="flex items-center gap-3 p-4 border border-border rounded-lg shadow-sm bg-card hover:shadow-md transition sm:col-span-2 lg:col-span-1">
//               <MdLocationOn className="text-primary text-xl" />
//               <span className="text-foreground">Somewhere in the World</span>
//             </div>

//             <div className="flex items-center gap-3 p-4 border border-border rounded-lg shadow-sm bg-card hover:shadow-md transition sm:col-span-2 lg:col-span-1">
//               <MdAccessTime className="text-primary text-xl" />
//               <span className="text-foreground">Office Hours: 10am - 6pm</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
