import React from 'react';
import { FaGraduationCap, FaCrown, FaShieldAlt, FaFlag, FaFutbol, FaHandsHelping } from 'react-icons/fa';

const BenefitsData = [
    {
        "title": "Holistic Learning Approach",
        "description": "Our curriculum focuses on nurturing cognitive, social, emotional, and physical development, ensuring a well-rounded education.",
        "icon": <FaGraduationCap />
    },
    {
        "title": "Experienced Educators",
        "description": "Our passionate and qualified teachers create a supportive and stimulating learning environment.",
        "icon": <FaCrown />
    },
    {
        "title": "Nurturing Environment",
        "description": "We prioritize safety and provide a warm and caring atmosphere for every child.",
        "icon": <FaShieldAlt />
    },
    {
        "title": "Play-Based Learning",
        "description": "We believe in the power of play to foster creativity, problem-solving skills, and imagination.",
        "icon": <FaFlag />
    },
    {
        "title": "Individualized Attention",
        "description": "Our small class sizes enable personalized attention, catering to each child's unique needs.",
        "icon": <FaFutbol />
    },
    {
        "title": "Parent Involvement",
        "description": "We foster a strong parent-school partnership to ensure seamless communication and collaboration.",
        "icon": <FaHandsHelping />
    }
];

const OurBenefits = () => {
    return (
        <div className='mb-24 mt-24 lg:mt-0'>
            {/* Title */}
            <div className='text-center'>
                <h1 className='text-foreground text-4xl font-bold'>Our Benefits</h1>
                <p className='text-foreground mt-2'>With a dedicated team of experienced educators, state-of-the-art facilities, and a comprehensive curriculum,<br /> we aim to lay a strong foundation for your child's future.</p>
            </div>

            {/* Card Grid */}
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16'>
                {BenefitsData.map((benefit, index) => (
                    <div
                        key={index}
                        className="relative bg-muted border border-r-4 border-b-4 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* The small top-left icon box */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent rounded-md flex items-center justify-center shadow-sm border text-xl text-black"
                        >
                            {benefit.icon}
                        </div>

                        {/* Box */}
                        <div className="pt-6 p-4">
                            <h3 className="text-2xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurBenefits;