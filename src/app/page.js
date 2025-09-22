import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import OurBenefits from "@/components/sections/OurBenefits";
import OurPages from "@/components/sections/OurPages";
import Testimonials from "@/components/sections/Testimonials/Testimonials";


export default function Home() {
  return (
    <div className="w-10/12 mx-auto">
      <Hero />
      <OurBenefits />
      <FAQ />
      <Testimonials />
      <OurPages />
    </div>
  );
}
