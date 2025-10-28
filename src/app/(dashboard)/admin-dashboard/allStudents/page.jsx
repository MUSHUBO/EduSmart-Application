'use client';

import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaUserCircle, FaRegUserCircle } from 'react-icons/fa';
import { Bars } from 'react-loader-spinner';

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
        <h2 className="text-4xl font-extrabold text-gray-800">All Students</h2>
        <p className="text-gray-500 text-xl mt-2 sm:mt-0">
          Total: <span className="font-semibold text-gray-700">{students.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-bold font-semibold sticky top-0 z-10 text-xl">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id || index} className="hover:bg-blue-50 transition-all duration-150">
                  <td className="px-4 py-3 text-gray-500 font-medium">{index + 1}</td>

                  {/* Photo with DaisyUI avatar */}
                  <td className="px-4 py-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring ring-gray-200">
                        {student.studentPhoto ? (
                          <img src={student.studentPhoto} alt={student.studentFirstName} />
                        ) : (
                          <FaRegUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                    </div>
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
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{student.studentPhone}</td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{student.studentEmail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 italic bg-gray-50">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default AllStudent;
