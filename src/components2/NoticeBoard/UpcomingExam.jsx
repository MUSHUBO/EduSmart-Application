"use client";

import { useEffect, useState } from "react";

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/notice/exam-routine");
        const data = await res.json();
        setExams(data);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
  <div >
    <h1 className="text-2xl text-bold ">UpComing Exam </h1>
      <div className="p-6 grid md:grid-cols-2 gap-4">
      {exams.map((exam) => (
        <div
          key={exam._id}
          className="bg-background text-foreground p-4 rounded-lg shadow space-y-2"
        >
          <h2 className="font-bold text-lg">{exam.title}</h2>
          <p className="text-sm text-muted-foreground">
            Class {exam.class} — {new Date(exam.date).toLocaleDateString()}
          </p>

          <div className="flex gap-3 mt-3">
            <a
              href={exam.view}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-primary text-white text-sm font-medium hover:opacity-90"
            >
              View
            </a>
            <a
              href={exam.download}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-secondary text-foreground text-sm font-medium hover:opacity-90"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
