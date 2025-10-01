'use client';
import { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const AllStudent = () => {
    //   const [students, setStudents] = useState([]);
    const students = [
        {
            id: '123456789',
            name: 'Samantha William',
            date: '2021-03-25',
            parentName: 'Mana William',
            city: 'Jakarta',
            grade: 'VII A',
            avatar: 'https://i.pravatar.cc/150?img=1',
            phone: '081234567890',
            email: 'samantha@example.com',
        },
        {
            id: '987654321',
            name: 'Tony Soap',
            date: '2021-03-25',
            parentName: 'James Soap',
            city: 'Jakarta',
            grade: 'VII A',
            avatar: 'https://i.pravatar.cc/150?img=2',
            phone: '081234567891',
            email: 'tony@example.com',
        },
    ];

    //   TODO: ata pore Database theke data anbo
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await fetch('/api/students'); 
    //         const data = await res.json();

    //         if (Array.isArray(data)) {
    //           setStudents(data);
    //         }
    //       } catch (error) {
    //         console.error('Fetch error:', error);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    return (
        <div className="p-6 bg-white rounded-md shadow-md overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead className="text-left bg-gray-100">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Parent</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 flex items-center gap-2">
                                <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full" />
                                {student.name}
                            </td>
                            <td className="p-3 text-purple-600 font-semibold">{student.id}</td>
                            <td className="p-3">{new Date(student.date).toLocaleDateString()}</td>
                            <td className="p-3">{student.parentName}</td>
                            <td className="p-3">{student.city}</td>
                            <td className="p-3 flex gap-3 text-purple-600">
                                <a href={`tel:${student.phone}`}><FaPhone /></a>
                                <a href={`mailto:${student.email}`}><FaEnvelope /></a>
                            </td>
                            <td className="p-3">
                                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold">
                                    {student.grade}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllStudent;
