'use client';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/courseFeedback', { cache: 'no-store' });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setFeedbacks(data.data.slice(0, 3)); 
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 10000); 
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading feedback...</p>;

  if (!feedbacks.length)
    return <p className="text-center text-gray-500">No feedback yet.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbacks.map((fb, index) => (
        <div
          key={fb._id || index}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src={fb.userPhoto || `https://i.pravatar.cc/100?u=${fb.userEmail}`}
              alt={fb.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{fb.userName}</h4>
              <p className="text-xs text-gray-500">
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700 italic mb-2">“{fb.comment}”</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={18}
                className={star <= fb.rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
