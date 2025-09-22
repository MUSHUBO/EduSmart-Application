import React from "react";

const FAQ = () => {
  const faqData = [
    {
      question: "What are the school hours at Little Learners Academy?",
      answer:
        "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. We also offer extended care options for parents who need early drop-off or late pick-up.",
    },
    {
      question: "How do you handle food allergies and dietary restrictions?",
      answer:
        "We have a strict policy to ensure the safety of all students with food allergies. Parents are required to provide detailed information about their child's allergies and dietary needs. We work closely with families to create a safe eating environment, which includes allergen-free zones and a 'no food sharing' rule. Our staff is trained to administer an EpiPen and is knowledgeable about common allergens.",
    },
    {
      question: "Is there a uniform policy for students?",
      answer:
        "Yes, students are required to wear a school uniform. The uniform consists of a polo shirt with the school logo, and khaki or navy blue pants, shorts, or skirts. Detailed uniform guidelines can be found in the student handbook.",
    },
    {
      question:
        "What is the teacher-to-student ratio at Little Learners Academy?",
      answer:
        "Our teacher-to-student ratio is designed to provide personalized attention to each child. The exact ratio varies by age group, but we maintain small class sizes to foster a supportive learning environment. For our preschool classes, the ratio is typically 1:10, and for our elementary grades, it is 1:15.",
    },
    {
      question: "What extracurricular activities are available for students?",
      answer:
        "We offer a variety of extracurricular activities to enrich our students' learning experience. These include sports (soccer, basketball), arts (painting, drama), and academic clubs (chess, robotics). The availability of activities may vary by season and grade level.",
    },
    {
      question: "How do you handle discipline and behavior management?",
      answer:
        "We use a positive and supportive approach to behavior management. Our focus is on teaching children self-regulation and problem-solving skills. We use a combination of redirection, logical consequences, and positive reinforcement to guide students toward making good choices. We believe in open communication with parents to ensure consistency between school and home.",
    },
    {
      question: "How do I apply for admission to Little Learners Academy?",
      answer:
        "Applying for admission is a simple process. You can begin by filling out the online application on our school's website. After submitting the application, our admissions team will contact you to schedule a tour and an interview. Required documents include your child's birth certificate, immunization records, and previous school reports.",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="text-center py-8">
        <h1 className="text-foreground text-4xl font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-foreground mt-2">
          Find all the essential information you need in our FAQ section,
          designed to address the most frequently asked <br /> questions and
          help you make informed decisions for your child's education.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="collapse bg-accent collapse-plus dark:bg-muted dark:border-2 dark:border-white  rounded-box border-2 border-base-300 text-black"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-base font-medium dark:text-white">
              {item.question}
            </div>
            <div className="collapse-content text-sm dark:text-muted-foreground">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
