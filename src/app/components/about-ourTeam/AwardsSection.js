
import React from 'react';
import { IoPieChartOutline, IoBarChart, IoFlashOutline, IoArrowBack, IoArrowForward } from 'react-icons/io5';

const awardsData = [
  {
    icon: IoPieChartOutline,
    title: 'Outstanding Early Childhood Education Award',
    description: 'Presented by the National Association for the Education of Young Children (NAEYC) in recognition of Little Learners Academy’s commitment to delivering exceptional early childhood education and fostering a nurturing learning environment.',
  },
  {
    icon: IoBarChart,
    title: 'Innovative STEAM Education Award',
    description: 'Awarded by the Education Excellence Association for our pioneering efforts in introducing innovative STEAM (Science, Technology, Engineering, Arts, and Mathematics) programs that ignite creativity and critical thinking in young learners.',
  },
  {
    icon: IoFlashOutline,
    title: 'Environmental Stewardship Award',
    description: 'Received from the Green Earth Society for our dedication to environmental education, sustainable practices, and fostering a love for nature in our students.',
  },
];

const AwardCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="relative h-full">
      <div className="absolute top-2 left-2 w-full h-full bg-primary rounded-3xl"></div>
      <div className="relative bg-muted dark:bg-muted border-2 border-primary rounded-3xl p-8 h-full text-left">
        <div className="border border-primary rounded-lg w-12 h-12 flex items-center justify-center mb-6">
          <Icon className="text-2xl text-popover dark:text-popover" />
        </div>
        <h3 className="font-bold text-xl text-primary mb-3">{title}</h3>
        <p className="text-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const AwardsSection = () => {
  return (
    <section className="text-center px-5 mt-10">
      <div className="mb-12">
        <div className="inline-block text-black dark:text-white border border-primary rounded text-sm font-medium px-5 py-1 mb-4">
          Our Achievements
        </div>
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">
          Our Awards and Recognitions
        </h2>
        <p className="text-foreground max-w-3xl mx-auto leading-relaxed">
          Little Learners Academy takes pride in our commitment to delivering high-quality education and outstanding student experiences. We are honored to have received various awards and recognitions for our dedication to early childhood education.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {awardsData.map((award, index) => (
          <AwardCard
            key={index}
            icon={award.icon}
            title={award.title}
            description={award.description}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-between items-center">
        <p className="font-bold text-primary">8 More Awards</p>
        <div className="flex gap-3">
          <button className="border-2 border-primary rounded w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <IoArrowBack />
          </button>
          <button className="border-2 border-primary rounded w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <IoArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
