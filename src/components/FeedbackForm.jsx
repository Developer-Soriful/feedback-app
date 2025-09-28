"use client"
import React, { useState } from 'react';

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    // Client-side simple validation
    if (!formData.name || !formData.email || !formData.feedback) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit feedback.');
      }

      // Update the parent list state
      onFeedbackSubmitted(result.data);

      //  Show success message and reset form
      setSuccess(true);
      setFormData({ name: '', email: '', feedback: '' });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col justify-between shadow-lg w-full h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Share Your Feedback</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-teal-100 border border-teal-400 text-teal-700 rounded-md">
          <p className="font-medium">Feedback Submitted Successfully! 🎉</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-lg border text-black border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 focus:ring-2 transition duration-150"
            disabled={isLoading}
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-lg border text-black border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 focus:ring-2 transition duration-150"
            disabled={isLoading}
          />
        </div>

        {/* Feedback Textarea */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Thoughts</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full p-2.5 rounded-lg border text-black border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 focus:ring-2 transition duration-150 resize-none"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-semibold cursor-pointer text-white transition-all duration-200 ${isLoading
            ? 'bg-teal-400 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50'
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;