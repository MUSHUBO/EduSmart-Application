import Hero from "@/components/sections/Hero";
import OurBenefits from "@/components/sections/OurBenefits";
import OurPages from "@/components/sections/OurPages";

export default function Home() {
  return (
    <div className="w-10/12 mx-auto">
      <Hero />
      <OurBenefits />
      <OurPages />
    </div>
  );
}
