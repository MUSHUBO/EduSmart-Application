"use client";

import Image from "next/image";

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

export default function HowItWorks() {
  return (
    <section className="relative py-10 ">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="uppercase text-xs tracking-widest font-semibold text-orange-500 bg-orange-100 px-3 py-1 rounded">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            How <span className="text-green-500">It Works?</span>
          </h2>
        </div>

        {/* Background Line */}
        <div className="absolute inset-0 top-32 hidden md:block">
          <Image
            src="/images/process/process-line.png"
            alt="background line"
            fill
            className="object-contain pointer-events-none"
          />
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 md:grid-cols-4 z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center">
              {/* Image */}
              <div
                className={`relative w-48 h-48 mx-auto mb-4 rounded-lg shadow-lg overflow-hidden transform 
                ${index % 2 === 0 ? "-rotate-6" : "rotate-6"} hover:rotate-0 transition-transform duration-300`}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
