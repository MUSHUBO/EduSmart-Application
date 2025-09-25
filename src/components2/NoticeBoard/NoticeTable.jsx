"use client";

export default function NoticeTable({ notices }) {
  return (
    <div className="bg-background text-foreground p-4 rounded shadow overflow-x-auto">
      <h2 className="font-semibold mb-2">Notices</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Title</th>
            <th className="p-2">Department</th>
            <th className="p-2">Download</th>
            <th className="p-2">View</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((n, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{new Date(n.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{n.title}</td>
              <td className="p-2">{n.department}</td>
              <td className="p-2"><a href={n.fileUrl} download>📂</a></td>
              <td className="p-2"><a href={`/notices/${n._id}`}>👁</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
