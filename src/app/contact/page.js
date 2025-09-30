import ContactSection from "@/components2/contact/ContactSection";
import SendMassage from "@/components2/contact/SendMassage";




export default function ContactPage() {
  return (
    <section className="bg-background py-8 lg:py-16 w-11/12 mx-auto">
      <div className="container mx-auto">

<ContactSection></ContactSection>
     <SendMassage></SendMassage>
        
      </div>
    </section>
  );
}
