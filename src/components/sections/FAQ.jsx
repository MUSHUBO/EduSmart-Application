"use client";

import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FAQ() {
  useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
  const faqData1 = [
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
  ];

  const faqData2 = [
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
  ];

  return (
    <div data-aos="fade-up" className="w-full px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-18">
      <div className="text-center max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-popover dark:text-popover">
          Frequently <span className="text-secondary">Asked Questions</span>
        </h2>
        <p className="text-lg text-popover-foreground dark:text-popover-foreground mb-10 mt-3">
          Find all the essential information you need in our FAQ section,
          designed to address the most frequently asked questions and
          help.
        </p>
      </div>

      {/* 2 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {faqData1.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        <div className="space-y-4">
          {faqData2.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-aos="fade-up" className="p-0.5 rounded-lg bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary">
      <div className="bg-muted dark:bg-muted rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-left p-4 focus:outline-none hover:bg-accent rounded-lg dark:hover:bg-gray-900 transition-colors duration-200"
        >
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {question}
          </span>
          <span
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
