"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./testimonials.css"
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import TestimonialsCard from "@/app/components/Card/TestimonialsCard";


const PrevArrow = ({ className, style, onClick }) => (
   <button
      className="absolute -left-9 md:-left-12 lg:-left-15 top-1/2 -translate-y-1/2 bg-muted dark:bg-muted text-popover dark:text-popover border border-popover dark:border-popover p-1 md:p-2 lg:p-3 z-30 rounded-sm shadow-md hover:bg-primary duration-150"
      onClick={onClick}
   >
      <FaArrowLeft size={18} />
   </button>
);

const NextArrow = ({ className, style, onClick }) => (
   <button
      className="absolute -right-9 md:-right-12 lg:-right-15 top-1/2 -translate-y-1/2 bg-muted dark:bg-muted  text-popover dark:text-popover border border-popover dark:border-popover p-1 md:p-2 lg:p-3 z-30 rounded-sm shadow-md hover:bg-primary duration-150"
      onClick={onClick}
   >
      <FaArrowRight size={18} />
   </button>
);

const testimonials = [
   {
      id: 1,
      name: "Ahsan Rahman",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      description: "EduSmart school management system makes our school's operation efficient. Highly recommended!",
   },
   {
      id: 2,
      name: "Nusrat Jahan",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      description: "Managing students, teachers has never been easier. eduSmart is a lifesaver for our administration team.",
   },
   {
      id: 3,
      name: "Rafiq Ahmed",
      photo: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      description: "The dashboard is very intuitive and user-friendly. this helps us save time and avoid confusion in daily tasks.",
   },
   {
      id: 4,
      name: "Shabnur Akter",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      description: "Our teachers love how simple it is to track attendance and grades. this is a perfect solution for modern schools.",
   },
   {
      id: 5,
      name: "Imran Hossain",
      photo: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 5,
      description: "From student management to report generation, this does it all efficiently. Truly a for school management.",
   }
];



function Testimonials() {
   const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
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
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               dots: true,

            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   };
   return (
      <div className="slider-container px-4 md:px-6 lg:px-12 py-12 md:py-20 lg:py-28">
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

               <TestimonialsCard>


                  <img
                     src={t.photo}
                     alt={t.name}
                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <h3 className="mt-4 text-lg text-popover dark:text-popover font-semibold">{t.name}</h3>
                  <div className="flex mt-2">
                     {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.958a1 1 0 0 0-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.958z" />
                        </svg>
                     ))}
                  </div>
                  <p className="mt-4 text-popover-foreground dark:text-popover-foreground">{t.description}</p>
               </TestimonialsCard>

            ))}
         </Slider>
      </div>
   );
}

export default Testimonials;
