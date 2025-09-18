
import React from 'react';
import Image from 'next/image';

const timelineData = [
  {
    year: '2023',
    title: 'Resilience and Future Horizons',
    description: 'Adapting to new challenges, we remained committed to our mission of providing an exceptional early education. Looking ahead with optimism, we envision a future filled with boundless possibilities as we continue shaping the leaders and thinkers of tomorrow.',
  },
  {
    year: '2017',
    title: 'Innovation and Technology',
    description: 'Innovation became the driving force behind our kindergarten’s progress from 2016 to 2020. Embracing the latest educational technologies, we crafted engaging and interactive learning experiences for our students.',
  },
  {
    year: '2012',
    title: 'Expansion and Recognition',
    description: 'These years marked as a period of expansion and recognition for our school. As we extended our facilities and enhanced our curriculum, we received accolades for our commitment to quality education and innovative teaching methodologies.',
  },
  {
    year: '2005',
    title: 'Inception and Growth',
    description: 'Established in 2005, our kindergarten school began its journey with a vision to provide a nurturing space for young minds to explore, learn, and grow. Over the next five years, we witnessed significant growth.',
  },
];

const HistorySection = () => {
  return (
    <section className="text-center pt-10 mx-5">
      <div className="mb-12">
        <div className="inline-block text-black dark:text-white border border-primary rounded text-sm font-medium px-5 py-1 mb-4">
          Our Progressive Journey
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
          Our History
        </h2>
        <p className="text-secondary max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
          Founded with a passion for early education in 2005, our kindergarten school boasts a rich history...
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>
        <div className="relative bg-muted dark:bg-muted border-2 border-primary rounded-3xl p-4 md:p-8 lg:p-12 text-left">
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className="md:flex md:gap-x-4">
                <div className="hidden md:relative md:flex-shrink-0 md:w-16 md:self-stretch">
                  {index < timelineData.length - 1 && (
                    <>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-[calc(100%+3rem)] bg-accent bg-opacity-50"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-px h-[calc(100%+3rem)] bg-primary"></div>
                    </>
                  )}
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-full h-1.5 bg-accent bg-opacity-50"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-full h-px bg-primary"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full z-10"></div>
                </div>

                <div className="w-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute top-1 left-1 w-full h-full bg-primary rounded-xl"></div>
                      <div className="relative border-2 border-primary rounded-xl px-4 py-2 flex items-center gap-4 bg-white">
                        <div className="hidden md:block absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full z-10"></div>
                        <div className="flex-shrink-0 w-10 h-10">
                          <Image
                            src="/timeline-icon.svg"
                            alt="Timeline Icon"
                            width={40}
                            height={40}
                          />
                        </div>
                        <span className="font-serif font-bold text-xl md:text-2xl text-primary">{item.year}</span>
                      </div>
                    </div>

                    <div className="md:ml-2">
                      <h3 className="font-bold text-lg md:text-xl text-primary mb-1">{item.title}</h3>
                      <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
