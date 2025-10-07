'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Students",
    desc: "Use of technology to empower individuals adapt anyplace and whenever.",
    img: "/images/process/process-01.png",
  },
  {
    id: 2,
    title: "Teachers",
    desc: "Use of technology to empower individuals adapt anyplace and whenever.",
    img: "/images/process/process-02.png",
  },
  {
    id: 3,
    title: "Helpful Staff",
    desc: "Use of technology to empower individuals adapt anyplace and whenever.",
    img: "/images/process/process-03.png",
  },
  {
    id: 4,
    title: "Academic Staff",
    desc: "Use of technology to empower individuals adapt anyplace and whenever.",
    img: "/images/process/process-04.png",
  },
];

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="uppercase text-xs tracking-widest font-semibold text-orange-500 bg-orange-100 px-3 py-1 rounded">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            How <span className="text-green-500">It Works?</span>
          </h2>
        </motion.div>

        {/* Background Line */}
        {/* Background Line */}
        <motion.div
          className="absolute inset-0 top-16 hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/process/process-line.png"
            alt="background line"
            fill
            className="object-contain pointer-events-none"
          />
        </motion.div>


        {/* Steps */}
        <motion.div
          className="relative grid gap-10 md:grid-cols-4 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="text-center"
              variants={cardVariants}
            >
              {/* Image */}
              <motion.div
                className={`relative w-44 h-44 mx-auto mb-4 overflow-hidden transform transition-transform duration-300
                  ${index % 2 === 0 ? "-rotate-6" : "rotate-6"} hover:rotate-0`}
                whileHover={{ scale: index === 2 ? 1.15 : 1.05, y: index === 2 ? -10 : 0 }}
                style={{
                  scale: index === 2 ? 1.1 : 1, // third image slightly bigger by default
                }}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Info */}
              <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
