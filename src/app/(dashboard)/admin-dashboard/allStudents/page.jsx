'use client';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/students`, { cache: 'no-store' });
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          console.error('Invalid response:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading students...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Students</h2>

      <table className="min-w-full text-sm">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Parent</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id || index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <img
                    src={student.studentPhoto || 'https://i.pravatar.cc/100?u=' + student.studentEmail}
                    alt={student.studentFirstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-semibold">
                  {student.studentFirstName} {student.studentLastName}
                </td>

                <td className="p-3">
                  {student.parentFirstName} {student.parentLastName}
                </td>

                <td className="p-3 text-blue-600">
                  <a href={`tel:${student.studentPhone}`} className="flex items-center gap-2">
                    <FaPhone /> {student.studentPhone}
                  </a>
                </td>

                <td className="p-3 text-blue-600">
                  <a href={`mailto:${student.studentEmail}`} className="flex items-center gap-2">
                    <FaEnvelope /> {student.studentEmail}
                  </a>
                </td>

                <td className="p-3 text-gray-600">
                  {student.createdAt
                    ? new Date(student.createdAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-6 text-center text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudent;
