"use client";

import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";

const galleryImages = [
  { src: "/images/gallery/01 (1).jpg", span: "row-span-2" },
  { src: "/images/gallery/02 (1).jpg", span: "row-span-4" },
  { src: "/images/gallery/03 (1).jpg", span: "row-span-6" },
  { src: "/images/gallery/04 (1).jpg", span: "row-span-6" },
  { src: "/images/gallery/05.jpg", span: "row-span-4" },
  { src: "/images/gallery/06.jpg", span: "row-span-2" },
];

// Container & Item Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PhotoGallery() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-2 text-orange-500 uppercase text-sm font-semibold">
            <FaImages />
            Gallery
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Our Photo <span className="text-orange-500">Gallery</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto text-sm">
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 p-4 mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {galleryImages.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              alt="Gallery"
              className={`w-full h-full rounded-xl shadow-sm object-cover aspect-square ${img.span}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
