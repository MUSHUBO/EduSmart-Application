import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import OurBenefits from "@/components/sections/OurBenefits";
import OurPages from "@/components/sections/OurPages";
import Testimonials from "@/components/sections/Testimonials/Testimonials";


export default function Home() {
  return (
    <div>
      <div className="mx-2">
        <Hero />
      </div>
      <div className="w-10/12 mx-auto">
        <OurBenefits />
        <FAQ />
        <Testimonials />
        <OurPages />
      </div>
    </div>
  );
}