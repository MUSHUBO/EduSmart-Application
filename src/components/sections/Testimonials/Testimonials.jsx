
"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft, FaStar, FaQuoteRight } from "react-icons/fa";

const PrevArrow = ({ onClick }) => (
   <button
      className="absolute -left-9 md:-left-12 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800 text-black dark:text-white border border-gray-300 p-2 z-30 rounded-full shadow-md hover:bg-secondary duration-150"
      onClick={onClick}
   >
      <FaArrowLeft size={18} />
   </button>
);

const NextArrow = ({ onClick }) => (
   <button
      className="absolute -right-9 md:-right-12 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800 text-black dark:text-white border border-gray-300 p-2 z-30 rounded-full shadow-md hover:bg-secondary duration-150"
      onClick={onClick}
   >
      <FaArrowRight size={18} />
   </button>
);

export const testimonials = [
   {
      id: 1,
      name: "Avhishekh",
      role: "Teacher",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      feedback:
         "EduSmart makes managing classes so much easier. I can track attendance and communicate with students in one place.",
   },
   {
      id: 2,
      name: "Rajrani",
      role: "Student",
      photo: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 5,
      feedback:
         "The platform is very user-friendly. I can access assignments, grades, and announcements anytime from my phone.",
   },
   {
      id: 3,
      name: "Rahim Uddin",
      role: "Parent",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      feedback:
         "EduSmart helps me stay updated with my child’s progress and attendance. It’s very helpful for busy parents like me.",
   },
   {
      id: 4,
      name: "Nusrat Jahan",
      role: "Administrator",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      feedback:
         "From managing teachers to scheduling exams, EduSmart has streamlined everything. It saves us a lot of paperwork.",
   },
   {
      id: 5,
      name: "Tanvir Hasan",
      role: "Librarian",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4,
      feedback:
         "The digital library system in EduSmart is amazing. Students can easily check available books and request them online.",
   },
];

function Testimonials() {

   const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3, // Default desktop
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      responsive: [
         {
            breakpoint: 1024, // <= 1024px
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
            },
         },
         {
            breakpoint: 768, // <= 768px
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };



   return (
      <section
         className="relative bg-fixed bg-center bg-cover bg-no-repeat px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24"
         style={{
            backgroundImage:
               "url('images/portrait-successful-young-students-showing-thumbs-up.jpg')",
            backgroundAttachment: "fixed",
         }}
      >
         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-black/50"></div>

         {/* Section Title */}
         <div className="relative z-10 text-center max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto px-6">
               <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                  What Our <span className="text-secondary">Students Say's</span>
               </h2>
               <p className="text-lg text-gray-200 mb-10 mt-3">
                  It is a long established fact that a reader will be distracted by the
                  readable content of a page when looking at its layout.
               </p>
            </div>

            {/* Slider */}
            <div className="px-4">
               <Slider {...settings}>
                  {testimonials.map((t) => (
                     <div key={t.id} className="px-3">
                        <div className="bg-muted dark:bg-muted rounded-tl-4xl rounded-br-4xl shadow-lg p-3 md:p-4 lg:p-6 h-full flex flex-col justify-between">
                           {/* Rating Stars */}
                           <div className="flex text-secondary mb-4">
                              {[...Array(t.rating)].map((_, i) => (
                                 <FaStar key={i} className="text-xl" />
                              ))}
                           </div>

                           {/* Review Text */}
                           <p className="text-popover-foreground text-base text-start leading-relaxed mb-6 flex-grow">
                              {t.feedback}
                           </p>

                           {/* Footer Section */}
                           <div className="flex items-center justify-between mt-6">
                              {/* Profile */}
                              <div className="flex items-center gap-3">
                                 <div className="w-14 h-14 p-1 border-dashed rounded-full border-2 border-secondary">
                                    <img
                                       src={t.photo}
                                       alt={t.name}
                                       className="w-full h-full rounded-full object-cover"
                                    />
                                 </div>
                                 <div className="flex flex-col items-start">
                                    <h4 className="font-bold text-lg text-popover dark:text-popover">
                                       {t.name}
                                    </h4>
                                    <p className="text-sm font-bold text-orange-500">{t.role}</p>
                                 </div>
                              </div>

                              {/* Quote Icon */}
                              <FaQuoteRight className="text-secondary text-4xl opacity-80" />
                           </div>
                        </div>
                        <div className="bg-secondary w-[90%] mx-auto h-1.5 rounded-full">
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>

         </div>
      </section>
   );
}

export default Testimonials;

