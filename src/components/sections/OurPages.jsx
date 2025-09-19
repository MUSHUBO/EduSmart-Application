// components/NavigatePages.tsx
import { ArrowRight } from "lucide-react";

const pages = [
    {
        title: "About Us",
        description:
            "Discover our Mission, Values, and our unwavering commitment to providing the best learning experience for your child. Learn about our passionate educators and our engaging approach to early education.",
        link: "/about",
    },
    {
        title: "Academics",
        description:
            "Delve into our comprehensive academic programs designed to stimulate young minds, foster creativity, and encourage a love for learning. Explore our well-rounded curriculum that nurtures both intellectual and social development.",
        link: "/academics",
    },
    {
        title: "Student Life",
        description:
            "Peek into the vibrant and enriching world of Student Life at Little Learners Academy. Discover the array of extracurricular activities, arts and crafts, sports, and social events that make our school experience truly memorable.",
        link: "/student-life",
    },
    {
        title: "Admissions",
        description:
            "Learn about our Enrollment Process and how to secure your child's place at Little Learners Academy. Find information about our admission requirements, application deadlines, and available spaces.",
        link: "/admissions",
    },
];


export default function OurPages() {
    return (
        <section className="py-6 foreground">
            <div className="container mx-auto px-4 text-center">
                {/* Section Heading */}
                <button
                                    className="btn border-primary hover:bg-primary shadow-md px-6 border-b-4 border-r-4"
                                >
                                    Explore More <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Navigate through our Pages
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-foreground">
                    Your gateway to discovering a wealth of valuable information about our
                    kindergarten school. Feel free to explore and learn more about the
                    enriching experiences that await your child at our kindergarten school.
                </p>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 mt-12">
                    {pages.map((page, index) => (
                        <div
                            key={index}
                            className="border-2 rounded-2xl bg-muted dark:bg-muted shadow-md p-6 flex flex-col text-center border-b-8 border-r-8 border-primary"
                        >
                            {/* Top Part (Title + Line + Text) */}
                            <div className="flex-1 flex flex-col items-center">
                                <h3 className="text-xl text-popover dark:text-popover font-bold mb-4">{page.title}</h3>

                                {/* Decorative Line */}
                                <div className="flex items-center justify-center w-full mb-6">
                                    <span className="w-4 h-4 rounded-full border-2 border-primary"></span>
                                    <div className="flex-1 border-t-4 border-double border-primary mx-0"></div>
                                    <span className="w-4 h-4 rounded-full border-2 border-primary"></span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-popover-foreground dark:text-popover-foreground">{page.description}</p>
                            </div>

                            {/* Button (Stays at bottom) */}
                            <div className="mt-6">
                                <a
                                    href={page.link}
                                    className="btn border-primary shadow-md px-6 border-b-4 border-r-4"
                                >
                                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
