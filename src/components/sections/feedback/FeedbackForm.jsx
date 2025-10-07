'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

const FeedbackForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !comment || rating === 0) {
      toast.error('Please fill all fields and select a rating');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/courseFeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userEmail,
          comment,
          rating,
          createdAt: new Date(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Feedback submitted!');
        setUserName('');
        setUserEmail('');
        setComment('');
        setRating(0);
      } else {
        toast.error(data.message || 'Failed to send feedback');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Give Your Feedback</h2>

      <div>
        <label className="label">Name*</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">Email*</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">Comment*</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          rows={3}
        />
      </div>

      {/* ⭐ Star Rating */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={28}
            className={`cursor-pointer transition-colors ${
              star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
