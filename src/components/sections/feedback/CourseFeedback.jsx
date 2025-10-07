'use client';

import { Toaster } from "react-hot-toast";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

const CourseFeedback = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Course Feedback
      </h2>
      <Toaster position="top-right" />
      {/* Feedback List */}
      <FeedbackList />
      {/* Feedback Form */}
      <FeedbackForm />

    </div>
  );
};

export default CourseFeedback;
