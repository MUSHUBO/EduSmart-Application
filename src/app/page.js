import EventSlider from "@/components/polishedHome/EventSlider";
import HowItWorks from "@/components/polishedHome/HowItWorks";
import PhotoGallery from "@/components/polishedHome/PhotoGallery";
import TeachersSection from "@/components/polishedHome/TeachersSection";
import WhyChooseUs from "@/components/polishedHome/WhyChooseUs";
import AboutUsSection from "@/components/sections/AboutUsSection";
import Achievements from "@/components/sections/Achievements";
import Blogs from "@/components/sections/Bolgs/Blogs";
import CoursesSection from "@/components/sections/CoursesSection";
import FAQ from "@/components/sections/FAQ";
import CourseFeedback from "@/components/sections/feedback/CourseFeedback";
import Hero from "@/components/sections/Hero";
import Marketing from "@/components/sections/Marketing/Marketing";
import OurBenefits from "@/components/sections/OurBenefits";
import OurPages from "@/components/sections/OurPages";
import Parents from "@/components/sections/Parents/Parents";
import Testimonials from "@/components/sections/Testimonials/Testimonials";

export default function Home() {
  return (
    <div>

      {/* Hero section with full width */}
      <div>
        <Hero />
      </div>

      {/* Other Section */}
      <div className="w-10/12 mx-auto">
        <AboutUsSection />
      </div>

      <Achievements />

      <div className="w-10/12 mx-auto">
        <CoursesSection />
        <OurBenefits />
        <TeachersSection />
      </div>

      <WhyChooseUs />

      <div className="w-11/12 mx-auto">
        <PhotoGallery />
        <EventSlider />
        <HowItWorks />
      </div>
      <Testimonials />
      <div className="w-11/12 mx-auto">
      <Blogs></Blogs>
      <Parents></Parents>
        <FAQ />
        <Marketing />
        <CourseFeedback/>
      </div>
    </div>
  );
}