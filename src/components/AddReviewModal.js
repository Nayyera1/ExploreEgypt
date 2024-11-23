import React, { useState } from "react";

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [review, setReview] = useState({
    rating: 5,
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(review); // Pass the review data to the parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <label className="block mb-2">Rating:</label>
        <select
          name="rating"
          value={review.rating}
          onChange={handleInputChange}
          className="mb-4 p-2 border"
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Below Average</option>
          <option value={1}>1 - Poor</option>
        </select>
        <label className="block mb-2">Comment:</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleInputChange}
          className="w-full p-2 border mb-4"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
