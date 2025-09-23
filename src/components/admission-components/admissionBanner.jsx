import React from 'react';
import Image from 'next/image';

const AdmissionBanner = () => {
  return (
    <section className="relative mx-5 my-10">
      <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>

      <div className="relative bg-muted dark:bg-muted border-2 border-primary rounded-3xl p-8 md:p-14 overflow-hidden">
        <Image
          src="/corner.svg"
          alt="Decorative corner pattern"
          width={100}
          height={100}
          className="absolute top-0 left-0"
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-start">
            {/* <div className="relative group mb-6 ">
              <div className="absolute top-1.5 left-1.5 w-full h-full bg-primary rounded group-hover:top-0 group-hover:left-0 transition-all duration-200 "></div>
              <button className="relative text-black bg-white border border-primary rounded text-sm font-medium px-5 py-1 group-hover:top-1.5 group-hover:left-1.5 transition-all duration-200">
                Admission
              </button>
            </div> */}
            <div className='sm:mx-4 my-2 rounded-sm border-2 border-b-8 border-r-8 px-4 py-2 text-foreground  mx-auto border-primary'>
              Admission
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary leading-tight sm:text-center">
              Join Our Family of Young Learners
            </h1>
          </div>

          <div className="flex items-center">
            <p className=" font-small text-foreground leading-relaxed mx-auto sm:text-center">
              At Little Learners Academy, we welcome you to embark on an exciting educational journey for your child. Our admission process is designed to be transparent, straightforward, and inclusive. Here's a step-by-step guide to joining our school.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdmissionBanner;