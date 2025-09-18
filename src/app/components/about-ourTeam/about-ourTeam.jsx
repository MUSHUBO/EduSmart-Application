// components/AboutOurTeam.tsx
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

const teamMembers = [
    {
        name: "Ms. Sarah Anderson",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Ms. Sarah is a passionate educator with over 10 years of experience in guiding young minds. Her warm and nurturing approach creates a welcoming classroom environment where children feel comfortable to explore and learn.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mr. David Roberts",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "With a strong background in elementary education, Mr. David brings a creative and interactive teaching style to his classroom. His enthusiasm for learning inspires students to ask questions and think critically.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
];

export default function AboutOurTeam() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <button className="btn btn-outline mb-4">
                        Our Teachers With Expertise
                    </button>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Team Members</h2>
                    <p className="mt-4 text-base text-gray-600">
                        At Little Learners Academy, our teaching team is the heart of our
                        educational journey. We take great pride in employing highly
                        qualified and passionate educators who possess a deep understanding
                        of early childhood development. Our teachers create a warm and
                        engaging atmosphere, encouraging curiosity, instilling confidence,
                        and fostering a love for learning.
                    </p>
                </div>

                {/* Team Cards */}
                <div className="grid gap-8 md:grid-cols-2">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="card bg-white shadow-md border rounded-2xl overflow-hidden"
                        >
                            <div className="card-body">
                                {/* Top Section */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-full overflow-hidden bg-background relative">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
                                            />
                                        </div>

                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                    </div>
                                    <div className="border-2 rounded-xl p-2 bg-background">
                                        <FaEnvelope className="" />
                                    </div>
                                </div>

                                <div className="border-2 rounded-2xl bg-background">
                                    {/* Qualification */}
                                    <p className="mt-4 font-medium p-3">
                                        Qualification: {member.qualification}
                                    </p>

                                    {/* Description */}
                                    <p className="mt-3 text-sm text-gray-600">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
