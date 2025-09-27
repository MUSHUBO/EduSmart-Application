import React from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";

export default function StudentLife() {
  // Define the custom peach colors
  const peachLight = "#F8D8C8";
  const peachAccent = "#FDC3A9";
  const peachBackground = "#FCF3F0";

  // Shared card style
  const cardStyle =
    "bg-white p-6 rounded-lg shadow-sm text-left relative pt-12 border-t border-l border-black border-r-[6px] border-b-[6px]";

  // Extracurricular activities data
  const extracurriculars = [
    {
      icon: "⚡",
      label: "Sports and Athletics",
      desc: "Students can participate in various sports, from soccer and basketball to gymnastics and yoga. Sports help promote teamwork, physical fitness, and a sense of discipline.",
    },
    {
      icon: "🖌️",
      label: "Art and Creativity",
      desc: "Our art classes and creative workshops provide a platform for students to express their creativity through painting, drawing, and other artistic forms.",
    },
    {
      icon: "🎵",
      label: "Music and Performing Arts",
      desc: "Students can discover their musical talents through singing, playing musical instruments, and participating in drama and theater performances.",
    },
    {
      icon: "#️⃣",
      label: "Language Clubs",
      desc: "Language clubs offer an opportunity for students to immerse themselves in different languages and cultures, fostering global awareness.",
    },
    {
      icon: "🔬",
      label: "Science Club",
      desc: "The science club allows young scientists to explore the wonders of science through fun experiments and hands-on learning.",
    },
    {
      icon: "✨",
      label: "Cooking and Culinary Arts",
      desc: "Cooking classes introduce students to the joys of preparing and tasting delicious and healthy meals.",
    },
  ];

  // Events & Celebrations data
  const events = [
    {
      img: "https://i.ibb.co/xnSKg3r/be5664e1491e14fc1d8cfd1805693eac0bad782c.png",
      label: "Annual Sports Day",
      desc: "A day filled with friendly competition, team spirit, and sportsmanship.",
    },
    {
      img: "https://i.ibb.co/tPp1cWFk/4dfeafe68717c50d56032ebf81e39ddc2c274f3a.png",
      label: "Cultural Festivals",
      desc: "Celebrations of diverse cultural festivals, promoting cultural exchange and appreciation.",
    },
    {
      img: "https://i.ibb.co/n8Rc9SjH/d246834cd688d70ee44e790809176779784c88c6.png",
      label: "Art Exhibitions",
      desc: "Showcasing our students' artistic talents through exhibitions and displays.",
    },
    {
      img: "https://i.ibb.co/LhzxSj8R/c347ff5047f7725938668fc2747e585b12042225.png",
      label: "Science Fair",
      desc: "A platform for budding scientists to present their innovative projects and experiments.",
    },
    {
      img: "https://i.ibb.co/1frtZWTK/aa5910665901b0111ee1fb45e49b5b48e2466507.png",
      label: "International Day",
      desc: "A vibrant celebration of our diverse community, embracing cultures from around the world.",
    },
    {
      img: "https://i.ibb.co/whg8mcyV/a9251acaecec5e09f9ec77ea2bdef65f1553a948-1.png",
      label: "Graduation Ceremony",
      desc: "A significant milestone as our Kindergarten students prepare to embark on their academic journey.",
    },
  ];

  // Student support data
  const supports = [
    {
      icon: "💡",
      label: "Counseling",
      desc: "Professional counselors offer guidance and support to students, addressing their emotional and social well-being.",
    },
    {
      icon: "📖",
      label: "Learning Support",
      desc: "Our educators provide additional assistance to students who may require extra support in their academic journey.",
    },
    {
      icon: "🧑‍🤝‍🧑",
      label: "Parent-Teacher Collaboration",
      desc: "We foster a strong partnership with parents to ensure seamless communication and mutual support in a child's development.",
    },
  ];

  return (
    <section className="bg-white py-8 lg:py-16 w-11/12 mx-auto border border-gray-200 rounded-lg shadow-xl mb-12">
      {/* Intro Section */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row mb-16 border p-4 rounded-xl border-r-[6px] border-b-[6px] border-t border-l border-black">
        {/* Left side */}
        <div className="relative md:w-1/2 lg:w-5/12 pr-4 mb-6 md:mb-0">
          <div className="relative pt-16 lg:pt-20 z-10">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-gray-700 border border-gray-400 rounded-full bg-white">
              Enriching Student Life
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
              Embracing Learning with Discovery and Joy
            </h2>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 lg:w-7/12 pt-0 md:pl-8 flex items-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to our Student Life page, where the magic of childhood comes
            alive through the enriching experiences and adventures that our
            students embark on each day. At our kindergarten school, we believe
            that learning goes beyond textbooks, and we strive to create a
            holistic and engaging environment that nurtures every aspect of a
            child's development.
          </p>
        </div>
        <div className="absolute text-orange-300">
          <BsFillGrid1X2Fill size={40} />
        </div>
      </div>

      {/* Extracurricular Activities */}
      <Section
        title="Extracurricular Activities"
        tag="Our Features"
        desc="At Little Learners Academy, we believe in nurturing well-rounded
        individuals. Our extracurricular activities offer a diverse range of
        experiences that complement our academic curriculum and encourage
        students to explore their interests and passions."
      >
        {extracurriculars.map(({ icon, label, desc }) => (
          <div key={label} className={cardStyle}>
            <div
              className="absolute -top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center border border-gray-300"
              style={{ backgroundColor: peachAccent }}
            >
              <span className="text-xl">{icon}</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{label}</h4>
            <p className="text-gray-600 text-base">{desc}</p>
          </div>
        ))}
      </Section>

      {/* Events & Celebrations */}
      <Section
        title="Events & Celebrations"
        tag="Our Features"
        desc="At Little Learners Academy, we believe in nurturing well-rounded
        individuals. We celebrate every milestone and create cherished
        memories for our students."
      >
        {events.map(({ img, label, desc }) => (
          <div key={label} className={cardStyle}>
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
              <img
                src={img}
                alt={label}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{label}</h4>
            <p className="text-gray-600 text-base">{desc}</p>
          </div>
        ))}
      </Section>

      {/* Student Support */}
      <div
        style={{ backgroundColor: peachBackground }}
        className="mt-16 lg:mt-24 py-16"
      >
        <Section
          title="Student Support"
          tag="Our Achievements"
          desc="At Little Learners Academy, we are committed to providing a
          supportive and nurturing environment that meets the unique needs of
          each student."
        >
          {supports.map(({ icon, label, desc }) => (
            <div key={label} className={cardStyle}>
              <div
                className="absolute -top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center border border-gray-300"
                style={{ backgroundColor: peachAccent }}
              >
                <span className="text-xl">{icon}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{label}</h4>
              <p className="text-gray-600 text-base">{desc}</p>
            </div>
          ))}
        </Section>
      </div>
    </section>
  );
}

// Reusable section component
function Section({ tag, title, desc, children }) {
  return (
    <div className="container mx-auto px-4 lg:px-8 text-center mt-16 lg:mt-24 mb-16">
      <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-gray-700 border border-gray-400 rounded-full bg-white">
        {tag}
      </span>
      <h3 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6">
        {title}
      </h3>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-12 lg:mb-16">
        {desc}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  );
}
