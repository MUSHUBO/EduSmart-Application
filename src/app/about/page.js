
import React from 'react';
import Image from 'next/image';
import AboutOurTeam from '../components/about-ourTeam/about-ourTeam';
import MissionVisionSection from '../components/about-ourTeam/MissionVisionSection';
import AwardsSection from '../components/about-ourTeam/AwardsSection';

const About = () => {
  return (
    <div>
      <section className="relative mx-5 mt-10 bg-[#FFF]">
      <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>

      <div className="relative bg-white border-2 border-primary rounded-3xl p-8 md:p-14 overflow-hidden">
        <Image
          src="/corner.svg"
          alt="Decorative corner pattern"
          width={100}
          height={100}
          className="absolute top-0 left-0"
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-start">
            <div className="relative group mb-6">
              <div className="absolute top-1.5 left-1.5 w-full h-full bg-primary rounded group-hover:top-0 group-hover:left-0 transition-all duration-200"></div>
              <button className="relative bg-white border border-primary rounded text-sm font-medium px-5 py-1 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-200">
                Overview
              </button>
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Welcome to EduConnect 
            </h1>
          </div>

          <div className="flex items-center">
            <p className=" font-small leading-relaxed">
              A trusted education platform for your next life success, we believe in shaping curious minds and building a strong foundation for a lifelong love of learning. Our holistic approach fosters intellectual, social, emotional, and physical development, ensuring that each child reaches their full potential.
            </p>
          </div>

        </div>
      </div>
    </section>
    <section>

    </section>
    <MissionVisionSection />
    <AwardsSection />
    <AboutOurTeam/>
    
    </div>
  );
};

export default About;
