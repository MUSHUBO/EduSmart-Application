'use client';

import AddTeacherForm from '@/components/adminDashboard-components/AddTeacherFrom';
import { Toaster } from 'react-hot-toast';

export default function AddTeacherPage() {
  return (
    <>
      <Toaster position="top-right" />
      <AddTeacherForm/>
    </>
  );
}
