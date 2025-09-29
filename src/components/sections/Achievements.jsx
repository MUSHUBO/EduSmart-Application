"use client";
import React from 'react';
import { BookOpenText, Users, GraduationCap, Trophy } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const achievementsData = [
  { icon: BookOpenText, count: 500, label: '+ Total Courses' },
  { icon: Users, count: 1900, label: '+ Our Students' },
  { icon: GraduationCap, count: 750, label: '+ Skilled Lecturers' },
  { icon: Trophy, count: 30, label: '+ Win Awards' },
];

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative bg-achievements min-h-[400px] flex items-center justify-center py-16 md:py-24"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#116E63]/70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg"
            >
              {/* Icon */}
              <div className="w-14 h-14 md:w-18 md:h-18 flex items-center justify-center bg-secondary rounded-xl mb-4 shadow-lg">
                <achievement.icon
                  className="w-10 h-10 md:w-12 md:h-12 text-white"
                  strokeWidth={1.5}
                />
              </div>

              {/* Count with scroll-triggered animation */}
              <p className="text-3xl md:text-4xl font-extrabold mb-1">
                {inView ? (
                  <CountUp end={achievement.count} duration={2} separator="," />
                ) : (
                  0
                )}
              </p>

              {/* Label */}
              <p className="text-sm md:text-lg font-medium tracking-wide opacity-90 text-center">
                {achievement.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;