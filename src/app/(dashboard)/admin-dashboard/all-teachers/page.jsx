'use client';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { Bars } from 'react-loader-spinner';

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers', { cache: 'no-store' });
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-x-auto transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800">All Teachers</h2>
        <p className="text-gray-500 text-sm mt-2 sm:mt-0">
          Total: <span className="font-semibold text-gray-700">{teachers.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {teachers.length > 0 ? (
              teachers.map((teacher, index) => (
                <tr
                  key={teacher._id || index}
                  className="hover:bg-blue-50 transition-all duration-150"
                >
                  {/* Index */}
                  <td className="px-4 py-3 text-gray-500 font-medium">
                    {index + 1}
                  </td>

                  {/* Photo */}
                  <td className="px-4 py-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-gray-200">
                        {teacher.teacherPhoto ? (
                          <img
                            src={teacher.teacherPhoto}
                            alt={teacher.firstName}
                            className="object-cover"
                          />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                    {teacher.firstName} {teacher.lastName}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    {teacher.email}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    {teacher.phone}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 italic bg-gray-50"
                >
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default AllTeachers;
