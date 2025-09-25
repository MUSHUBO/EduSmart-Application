"use client";

export default function ExamTable({ exams }) {
  return (
    <div className="bg-background text-foreground p-4 rounded shadow overflow-x-auto">
      <h2 className="font-semibold mb-2">Exam Routines</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Title</th>
            <th className="p-2">Class</th>
            <th className="p-2">Download</th>
            <th className="p-2">View</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} className="border-b">
              <td className="p-2">{new Date(exam.date).toLocaleDateString()}</td>
              <td className="p-2">{exam.title}</td>
              <td className="p-2">{exam.class}</td>
              <td className="p-2">
                <a href={exam.download} target="_blank" rel="noopener noreferrer">📂</a>
              </td>
              <td className="p-2">
                <a href={exam.view} target="_blank" rel="noopener noreferrer">👁</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
