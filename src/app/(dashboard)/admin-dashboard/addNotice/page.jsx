'use client';

import AddNoticeForm from '@/components2/NoticeBoard/NoticeFrom';
import { Toaster } from 'react-hot-toast';

export default function AddNotice() {
  return (
    <>
      <Toaster position="top-right" />
  <AddNoticeForm />;
    </>
  );
}