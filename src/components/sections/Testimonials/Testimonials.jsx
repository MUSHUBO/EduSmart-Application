"use client";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./testimonials.css"
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';


const PrevArrow = ({ onClick }) => (
   <button
      className="absolute -left-9 md:-left-12 lg:-left-15 top-1/2 -translate-y-1/2 bg-muted dark:bg-muted text-popover dark:text-popover border border-popover dark:border-popover dark:hover:bg-primary p-1 md:p-2 lg:p-3 z-30 rounded-sm shadow-md hover:bg-primary duration-150"
      onClick={onClick}
   >
      <FaArrowLeft size={18} />
   </button>
);

const NextArrow = ({ onClick }) => (
   <button
      className="absolute -right-9 md:-right-12 lg:-right-15 top-1/2 -translate-y-1/2 bg-muted dark:bg-muted  text-popover dark:text-popover border border-popover dark:border-popover p-1 md:p-2 lg:p-3 z-30 rounded-sm shadow-md hover:bg-primary dark:hover:bg-primary duration-150"
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
         "EduSmart makes managing classes so much easier. I can track attendance, share notes, and communicate with students in one place."
   },
   {
      id: 2,
      name: "Rajrani",
      role: "Student",
      photo: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 5,
      feedback:
         "The platform is very user-friendly. I can access assignments, grades, and announcements anytime from my phone."
   },
   {
      id: 3,
      name: "Rahim Uddin",
      role: "Parent",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      feedback:
         "EduSmart helps me stay updated with my child’s progress and attendance. It’s very helpful for busy parents like me."
   },
   {
      id: 4,
      name: "Nusrat Jahan",
      role: "Administrator",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      feedback:
         "From managing teachers to scheduling exams, EduSmart has streamlined everything. It saves us a lot of paperwork."
   },
   {
      id: 5,
      name: "Tanvir Hasan",
      role: "Librarian",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4,
      feedback:
         "The digital library system in EduSmart is amazing. Students can easily check available books and request them online."
   }
];



function Testimonials() {

   const settings = {
      className: "center",
      centerMode: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               centerMode: false,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: false,
            },
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: false,
            },
         },
      ],
   };




   useEffect(() => {
      AOS.init({
         duration: 1000,
         once: true,
      });
   }, []);

   return (
      <div data-aos="fade-up" className="slider-container px-4 md:px-6 lg:px-12">
         <div className="text-center">
            <h2 className="text-3xl md:text-4xl text-popover dark:text-popover font-bold mb-4 md:mb-6 ">
               Our Testimonials
            </h2>
            <h3 className="text-sm md:text-base text-popover-foreground dark:text-popover-foreground max-w-[800px] mx-auto font-medium mb-6 md:mb-8 lg:mb-12">
               Our testimonials are heartfelt reflections of the nurturing environment er provide, where children flourish both ocodemically and emotionally.
            </h3>
         </div>

         <Slider {...settings}>


            {testimonials.map((t) => (
               <div className="bg-muted mr-12 max-h-[400px] rounded-xl shadow-md p-6 relative">
                  {/* Quote Text */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                     {t.feedback}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                     <img
                        src={t.photo}
                        alt={t.photo}
                        className="w-14 h-14 rounded-full object-cover shadow"
                     />
                     <div>
                        <h4 className="font-semibold text-gray-800">Gordon D Novak</h4>
                        <p className="text-sm text-gray-700">{t.role}</p>
                        {/* Stars */}
                        <div className="flex text-orange-500 mt-1">
                           {[...Array(5)].map((_, i) => (
                              <FaStar key={i} />
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Quote Icon */}
                  <FaQuoteRight className="text-teal-500 text-4xl absolute bottom-4 right-4 opacity-80" />
               </div>
            ))}
         </Slider>
      </div>
   );
}

export default Testimonials;
