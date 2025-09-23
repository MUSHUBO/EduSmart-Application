import ContactInfo from "@/components2/ContactInfo";
import StudentFrom from "@/components2/StudentFrom";



export default function ContactPage() {
  return (
    <section className="bg-background py-8 lg:py-16 w-11/12 mx-auto">
      <div className="container mx-auto">
        <ContactInfo></ContactInfo>
        <StudentFrom></StudentFrom>
        
      </div>
    </section>
  );
}
