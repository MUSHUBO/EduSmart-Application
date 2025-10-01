'use client';

import AddStudentForm from '@/components/adminDashboard-components/AddStudentForm ';
import { Toaster } from 'react-hot-toast';

export default function AddStudentPage() {
  return (
    <>
      <Toaster position="top-right" />
      <AddStudentForm />
    </>
  );
}
