import React from 'react';

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;

  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const FeedbackCard = ({ feedbackItem }) => {
  
  const { name, email, feedback: feedbackText, timestamp } = feedbackItem;
  const formattedTime = timeAgo(timestamp);

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm 
                    border-l-4 border-l-teal-400 hover:shadow-md transition-shadow">

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {name}
        </h3>
        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
          {formattedTime}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-3 italic">
        "{feedbackText}"
      </p>

      <div className="text-sm text-gray-400 border-t pt-2 mt-2">
        <span className="font-mono text-xs">{email}</span>
      </div>

    </div>
  );
};

export default FeedbackCard;