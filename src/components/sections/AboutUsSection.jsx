import React from 'react';
import { BookOpen, Globe, Phone, ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';


// Images import
import mainImagePath from "../../../public/assets/about_us-images/about-us01.jpg"


const AboutUsSection = () => {
  return (
    <section className="py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* === LEFT COLUMN: Image and Service Badge === */}
          <div className="relative flex-1 w-full lg:w-5/12">
            {/* Main image container with colored borders */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              {/* Orange top bar */}
              <div className="absolute top-0 left-0 w-full h-4 bg-orange-500 rounded-t-xl z-10" />
              {/* Main Image */}
              <Image
                src={mainImagePath}
                alt="Group of students walking on campus"
                className="w-full h-auto object-cover"
              />
              {/* Green bottom-right accent */}
              <div className="absolute bottom-0 right-0 h-10 w-2/3 bg-teal-700 opacity-100 rounded-tl-[80px]" />
              <div className="absolute bottom-0 right-0 h-2/3 w-10 bg-teal-700 opacity-100 rounded-tl-[100px]" />
            </div>

            {/* 30 Years of Quality Service Badge */}
            <div className="absolute -left-10 bottom-12 w-72 p-4 bg-orange-500 shadow-xl text-center">
              {/* Assuming the icon is a custom image, using a placeholder div */}
              {/* For a real project, replace the div with a proper <img> tag */}
              <div className="w-12 h-12 mx-auto mb-2 bg-orange-300 rounded-full flex items-center justify-center border-2 border-white">
                {/* Placeholder for the icon in the image */}
                <span className="text-xl text-white font-bold">💡</span>
              </div>
              <p className="text-white text-lg font-bold">5+ Years Of</p>
              <p className="text-white text-base leading-tight">Quality Service</p>
            </div>
          </div>

          {/* === RIGHT COLUMN: Content === */}
          <div className="w-full flex-1 pt-16 lg:pt-0">
            <p className="text-lg font-semibold uppercase tracking-widest text-orange-500 mb-2">
              About Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Our Education System <br />
              <span className="text-orange-500">Inspires</span> You More.
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl">
              There are many variations of passages available but the majority have suffered
              alteration in some form by injected humour randomised words which don't look
              even slightly believable. If you are going to use passage...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Aligned to the Left layout */}
              <div className='flex flex-col gap-6'>
                {/* Education Services Card */}
                <ServiceCard
                  icon={BookOpen}
                  title="Education Services"
                  description="It is a long established fact that reader will to using content."
                />

                {/* International Hubs Card */}
                <ServiceCard
                  icon={Globe}
                  title="International Hubs"
                  description="It is a long established fact that reader will to using content."
                />
              </div>

              {/*  Aligned to the right layout */}
              <div className="relative">
                {/* Overlay Quote Box */}
                <div className="w-52 h-full p-4 bg-amber-100 rounded-2xl hidden lg:block">
                  <p className="text-gray-600 mb-2">
                    It is a long established fact that a reader will be distracted by the
                    content of a page when looking at its reader for the long words layout.
                  </p>
                  <div className="absolute bottom-0 right-22 text-6xl font-extrabold text-primary opacity-50 select-none -translate-x-3 translate-y-3">
                    <Quote />
                  </div>
                </div>
              </div>

            </div>


            {/* Call to Action and Contact */}
            <div className="flex items-center space-x-6 mt-16">
              <button className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
                DISCOVER MORE <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-600 text-white rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Now</p>
                  <a href="tel:+21236547898" className="text-xl font-bold text-gray-900 hover:text-orange-500 transition duration-300">
                    +2 123 654 7898
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Component for the service cards
const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-3 bg-orange-100 text-orange-500 rounded-lg shadow-sm">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AboutUsSection;