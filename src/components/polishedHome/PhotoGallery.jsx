'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages, FaTimes, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

const galleryImages = [
  "/images/gallery/01 (1).jpg",
  "/images/gallery/02 (1).jpg",
  "/images/gallery/03 (1).jpg",
  "/images/gallery/04 (1).jpg",
  "/images/gallery/05.jpg",
  "/images/gallery/06.jpg",
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  const handlePrev = () => setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 text-orange-500 uppercase text-sm font-semibold">
            <FaImages />
            Gallery
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Our Photo <span className="text-orange-500">Gallery</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto text-sm">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
        </div>

        {/* Gallery Grid */}
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
          <div className="grid grid-cols-3 gap-4 p-4 mx-auto">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`relative w-full h-full rounded shadow-sm min-h-10 dark:bg-gray-500 aspect-square cursor-pointer ${
                  i === 0 ? 'row-span-2' :
                  i === 1 ? 'row-span-4' :
                  i === 2 ? 'row-span-6' :
                  i === 3 ? 'row-span-6' :
                  i === 4 ? 'row-span-4' : 'row-span-2'
                }`}
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                {/* Overlay Icon */}
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 rounded transition-opacity duration-300"
                >
                  <FaSearch className="text-white text-3xl md:text-4xl" />
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl hover:text-red-500 transition"
            >
              <FaTimes />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 text-white text-4xl hover:text-orange-500 transition"
            >
              <FaArrowLeft />
            </button>

            {/* Selected Image */}
            <motion.img
              key={selectedIndex}
              src={galleryImages[selectedIndex]}
              alt="Selected"
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 text-white text-4xl hover:text-orange-500 transition"
            >
              <FaArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
