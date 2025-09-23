// "use client";

// export default function UpcomingExams({ exams }) {
//   return (
//     <div className="bg-background text-foreground p-4 rounded shadow">
//       <h2 className="font-semibold mb-2">Upcoming Exams</h2>
//       <ul className="space-y-2">
//         {exams.map((exam, i) => (
//           <li key={i} className="flex justify-between border p-2 rounded">
//             {exam.subject} - {new Date(exam.date).toLocaleDateString()}
//             <button className="text-primary font-medium">See Routine</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
