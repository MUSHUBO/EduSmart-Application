'use client';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`/api/teachers`, { cache: 'no-store' });
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setTeachers(data.data);
        } else {
          console.error('Invalid response:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading teachers...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Teachers</h2>

      <table className="min-w-full text-sm">
        <thead className="text-left bg-gray-100">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date Joined</th>
          </tr>
        </thead>

        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr key={teacher._id || index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <img
                    src={teacher.teacherPhoto || 'https://i.pravatar.cc/100?u=' + teacher.teacherEmail}
                    alt={teacher.teacherFirstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-semibold">
                  {teacher.teacherFirstName} {teacher.teacherLastName}
                </td>

                <td className="p-3 text-blue-600">
                  <a href={`tel:${teacher.teacherPhone}`} className="flex items-center gap-2">
                    <FaPhone /> {teacher.teacherPhone}
                  </a>
                </td>

                <td className="p-3 text-blue-600">
                  <a href={`mailto:${teacher.teacherEmail}`} className="flex items-center gap-2">
                    <FaEnvelope /> {teacher.teacherEmail}
                  </a>
                </td>

                <td className="p-3 text-gray-600">
                  {teacher.createdAt
                    ? new Date(teacher.createdAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTeachers;
