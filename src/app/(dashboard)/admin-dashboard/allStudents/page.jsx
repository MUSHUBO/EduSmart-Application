'use client';

import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaUserCircle } from 'react-icons/fa';

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

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading students...
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Students</h2>
        <p className="text-gray-500 text-sm">
          Total: <span className="font-semibold text-gray-700">{students.length}</span>
        </p>
      </div>

      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">Photo</th>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Parent</th>
            <th className="px-4 py-3 text-left font-semibold">Phone</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Date</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student._id || index}
                className="hover:bg-blue-50 transition-all duration-150"
              >
                {/* Index */}
                <td className="px-4 py-3 text-gray-500 font-medium">
                  {index + 1}
                </td>

                {/* Photo */}
                <td className="px-4 py-3">
                  {student.studentPhoto ? (
                    <img
                      src={student.studentPhoto}
                      alt={student.studentFirstName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </td>

                {/* Name */}
                <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                  {student.studentFirstName} {student.studentLastName}
                </td>

                {/* Parent */}
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {student.parentFirstName} {student.parentLastName}
                </td>

                {/* Phone */}
                <td className="px-4 py-3 text-blue-600 whitespace-nowrap">
                  <a
                    href={`tel:${student.studentPhone}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaPhone className="text-blue-500" /> {student.studentPhone}
                  </a>
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-blue-600 whitespace-nowrap">
                  <a
                    href={`mailto:${student.studentEmail}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FaEnvelope className="text-blue-500" />{' '}
                    {student.studentEmail}
                  </a>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {student.createdAt
                    ? new Date(student.createdAt).toLocaleDateString('en-GB')
                    : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="p-6 text-center text-gray-500 italic bg-gray-50"
              >
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
