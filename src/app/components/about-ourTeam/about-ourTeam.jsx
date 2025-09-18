// components/AboutOurTeam.tsx
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

const teamMembers = [
    {
        name: "Kazi Sabbir",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Kazi Sabbir is a passionate educator dedicated to creating a nurturing and inspiring classroom environment for young learners.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mahafuj Hossain",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Mahafuj Hossain brings creativity and enthusiasm to his teaching, fostering curiosity and critical thinking among students.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mazedul Islam",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Mazedul Islam focuses on hands-on learning and providing a supportive environment where children feel valued and encouraged.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Md Rabiul",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Md Rabiul uses interactive teaching methods to make learning engaging and accessible for all students.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mehedi Hasan",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Mehedi Hasan emphasizes creativity and problem-solving in his classroom, inspiring young learners to explore and grow.",
        image: "https://i.ibb.co.com/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Shekh Shubo",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Shekh Shubo is committed to nurturing a dynamic and interactive classroom, encouraging a lifelong love for learning.",
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
                            className="card bg-white shadow-md border rounded-2xl overflow-hidden border-b-8 border-r-8"
                        >
                            <div className="card-body">
                                {/* Top Section */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-background relative">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
                                            />
                                        </div>

                                        <h3 className="font-bold text-lg ">{member.name}</h3>
                                    </div>
                                    <div className="border rounded-xl p-2 bg-background">
                                        <FaEnvelope className="" />
                                    </div>
                                </div>

                                <div className="border-2 rounded-xl bg-background p-4 flex flex-col gap-3 mt-3">
                                    {/* Qualification */}
                                    <p className="font-medium text-base">
                                        Qualification: {member.qualification}
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed">
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
