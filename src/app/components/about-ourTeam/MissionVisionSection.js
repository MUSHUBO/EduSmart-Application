import React from 'react';
import Image from 'next/image';

const MissionVisionSection = () => {
  return (
    <section className="text-center mx-5 mt-10">
      <div className="mb-12">
        <div className="inline-block text-black dark:text-white border border-primary rounded text-sm font-medium px-5 py-1 mb-4">
          Mission & Visions
        </div>
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">
          Our Mission & Visions
        </h2>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          We are here to provide a nurturing and inclusive environment where young minds can thrive, fostering a love for learning and personal growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        
        <div className="relative">
          <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>
          <div className="relative bg-white border-2 border-primary rounded-3xl p-8 h-full">
            <div className="absolute top-8 right-8">
              <Image 
                src="/mission-icon.svg"
                alt="Mission Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-6">
              Mission
            </h3>
            <p className="text-secondary leading-relaxed pr-10">
              At Little Learners Academy, our mission is to inspire a passion for learning and empower young minds to become confident, compassionate, and creative individuals. We strive to create a safe and inclusive space where children thrive academically, socially, and emotionally, setting the stage for a successful educational journey.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>
          <div className="relative bg-white border-2 border-primary rounded-3xl p-8 h-full">
            <div className="absolute top-8 right-8">
              <Image 
                src="/vision-icon.svg"
                alt="Vision Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-6">
              Vision
            </h3>
            <p className="text-secondary leading-relaxed pr-10">
              Our vision is to be a beacon of educational excellence, where children are encouraged to explore, discover, and express their unique talents. We aim to foster a generation of lifelong learners equipped with critical thinking, empathy, and a deep appreciation for diversity.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionVisionSection;
