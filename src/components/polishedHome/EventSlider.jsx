"use client";

import Slider from "react-slick";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const events = [
  {
    id: 1,
    title: "High School Program 2025",
    date: "16 June, 2025",
    time: "10.00AM - 04.00PM",
    location: "25/B Milford Road, New York",
    description:
      "There are many variations of passages the majority have some injected humour.",
    img: "/images/teachers/01.jpg",
  },
  {
    id: 2,
    title: "Science Fair 2025",
    date: "20 June, 2025",
    time: "09.00AM - 02.00PM",
    location: "25/B Milford Road, New York",
    description:
      "Explore creative science projects made by students and learn together.",
    img: "/images/teachers/02.jpg",
  },
  {
    id: 3,
    title: "Cultural Program 2025",
    date: "25 June, 2025",
    time: "01.00PM - 06.00PM",
    location: "25/B Milford Road, New York",
    description:
      "An event full of joy, cultural performances, music, and celebration.",
    img: "/images/teachers/03.jpg",
  },
  {
    id: 4,
    title: "Sports Meet 2025",
    date: "01 July, 2025",
    time: "08.00AM - 05.00PM",
    location: "25/B Milford Road, New York",
    description:
      "Exciting sports competitions and teamwork activities all day long.",
    img: "/images/teachers/04.jpg",
  },
];

export default function EventSlider() {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      className="py-10  relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-orange-500 font-semibold uppercase">
            Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Upcoming <span className="text-orange-500">Events</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="px-3"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 cursor-pointer hover:shadow-lg transition">
                  {/* Image with zoom */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-40 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={event.img}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Info */}
                  <div className="mt-3">
                    <div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
                      <FaMapMarkerAlt className="text-orange-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-orange-500" />{" "}
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-orange-500" /> {event.time}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">
                      {event.description}
                    </p>

                    {/* Button */}
                    <button className="mt-3 bg-orange-500 text-white font-semibold text-xs px-4 py-1.5 rounded shadow hover:bg-orange-600 transition">
                      JOIN EVENT →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>

          {/* Custom Arrows (padding added) */}
          {showArrows && (
            <>
              <button
                onClick={() => sliderRef.current.slickPrev()}
                className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow hover:bg-orange-600 transition"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => sliderRef.current.slickNext()}
                className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow hover:bg-orange-600 transition"
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
