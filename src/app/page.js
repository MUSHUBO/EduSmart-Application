import EventSlider from "@/components/polishedHome/EventSlider";
import HowItWorks from "@/components/polishedHome/HowItWorks";
import PhotoGallery from "@/components/polishedHome/PhotoGallery";
import TeachersSection from "@/components/polishedHome/TeachersSection";
import WhyChooseUs from "@/components/polishedHome/WhyChooseUs";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Marketing from "@/components/sections/Marketing/Marketing";
import OurBenefits from "@/components/sections/OurBenefits";
import OurPages from "@/components/sections/OurPages";
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
        <OurBenefits />
        <OurPages />
        <Marketing />
        <TeachersSection />
        <WhyChooseUs />
        <PhotoGallery />
        <EventSlider/>
        <HowItWorks/>
        <Testimonials />
        <FAQ />
      </div>

    </div>
  );
}