import ContactBanner from "@/components2/contact/ContacrBanner";
import ContactSection from "@/components2/contact/ContactSection";
import OurLocation from "@/components2/contact/OurLocation";
import SendMassage from "@/components2/contact/SendMassage";




export default function ContactPage() {
  return (
    <section className="bg-background py-8 lg:py-16 w-11/12 mx-auto">

      <div className="container mx-auto space-y-2">
      <ContactBanner></ContactBanner>
    <ContactSection></ContactSection>
     <SendMassage></SendMassage>
      <OurLocation></OurLocation> 
      </div>
      
    </section>
  );
}
