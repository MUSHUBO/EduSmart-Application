import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

const teamMembers = [
    {
        name: "Kazi Sabbir",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Kazi Sabbir is a passionate educator dedicated to creating a nurturing and inspiring classroom environment for young learners.",
        image: "https://i.ibb.co.com/rKVkwCx9/IMG20250808162448-removebg-preview.png",
    },
    {
        name: "Mahafuj Hossain",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Mahafuj Hossain brings creativity and enthusiasm to his teaching, fostering curiosity and critical thinking among students.",
        image: "https://i.ibb.co/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mazedul Islam",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Mazedul Islam focuses on hands-on learning and providing a supportive environment where children feel valued and encouraged.",
        image: "https://i.ibb.co/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Md Rabiul",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Md Rabiul uses interactive teaching methods to make learning engaging and accessible for all students.",
        image: "https://i.ibb.co/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Mehedi Hasan",
        qualification: "Bachelor’s Degree in Early Childhood Education",
        description:
            "Mehedi Hasan emphasizes creativity and problem-solving in his classroom, inspiring young learners to explore and grow.",
        image: "https://i.ibb.co/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
    {
        name: "Shekh Shubo",
        qualification: "Master’s Degree in Elementary Education",
        description:
            "Shekh Shubo is committed to nurturing a dynamic and interactive classroom, encouraging a lifelong love for learning.",
        image: "https://i.ibb.co/LhSDZbY8/72bb0e9b-1a9c-40ab-949f-a3bbb1855171.png",
    },
];

export default function AboutOurTeam() {
    return (
        <section className="my-10">
            <div className="container mx-auto px-5">
                <div className="text-center mx-auto mb-12">
                    <div className="inline-block border text-black dark:text-white border-primary rounded text-sm font-medium px-5 py-1 mb-4 ">
                        Our Teachers With Expertise
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Team Members</h2>
                    <p className="mt-4 text-base text-foreground">
                        At Little Learners Academy, our teaching team is the heart of our
                        educational journey. We take great pride in employing highly
                        qualified and passionate educators who possess a deep understanding
                        of early childhood development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="card bg-muted dark:bg-muted shadow-md border border-primary rounded-2xl overflow-hidden border-b-8 border-r-8 flex flex-col"
                        >
                            <div className="card-body p-10 flex flex-col flex-grow">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-background relative">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg text-primary">{member.name}</h3>
                                    </div>
                                    <div className="border border-primary rounded-xl p-2 bg-background">
                                        <FaEnvelope className="text-primary" />
                                    </div>
                                </div>

                                <div className="border-2 border-primary rounded-xl bg-background p-4 flex flex-col gap-3 mt-3 flex-grow">
                                    <p className="font-medium text-base text-primary">
                                        Qualification: {member.qualification}
                                    </p>
                                    <p className="text-sm text-foreground leading-relaxed">
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
