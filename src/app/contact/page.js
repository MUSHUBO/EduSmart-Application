import ContactInfo from "@/components/ContactInfo";
import StudentFrom from "@/components/StudentFrom";



export default function ContactPage() {
  return (
    <section className="bg-background py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <ContactInfo></ContactInfo>
        <StudentFrom></StudentFrom>
        
      </div>
    </section>
  );
}
