import ContactBanner from "@/components2/contact/ContacrBanner";
import ContactSection from "@/components2/contact/ContactSection";
import OurLocation from "@/components2/contact/OurLocation";
import SendMassage from "@/components2/contact/SendMassage";





export default function ContactPage() {
  return (
    <section className=" mx-auto py-8 md:py-12 lg:py-16">
      <ContactBanner></ContactBanner>
      <div className="container mx-auto space-y-2">

    <ContactSection></ContactSection>
     <SendMassage></SendMassage>
      <OurLocation></OurLocation> 
 
      </div>
      
    </section>
  );
}
