import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../utils/userContext";
import AddReviewModal from "../components/AddReviewModal";

const DestinationDetailPage = () => {
  const { id } = useParams(); // Get the destination ID from the URL
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);

  // Fetch destination data and reviews
  useEffect(() => {
    if (!id) return;
    const fetchDestination = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/destinations/${id}`);
        setDestination(data);
        setReviews(data.reviews || []); // Set reviews from the fetched destination data
      } catch (error) {
        setError("Failed to load destination. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]); // Make sure this runs every time `id` changes (or on component mount)
  

  const handleReviewClick = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      setLoginPrompt(true);
    }
  };

  const handleReviewSubmit = async (review) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/destinations/${id}/reviews`, {
        ...review,
        user: user.username,
      });
  
      if (response.status === 200) {
        // Instead of just appending, you could refetch reviews
        const updatedReviewsResponse = await axios.get(`http://localhost:5000/api/destinations/${id}`);
        setReviews(updatedReviewsResponse.data.reviews || []); // Fetch updated reviews
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };
  

  // If loading, show loading text
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="loader"></div></div>;

  // If there's an error, show the error message
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  // Ensure destination is defined before accessing its properties
  if (!destination) return <p className="text-center text-gray-500 mt-4">Destination not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-5xl font-extrabold text-center mt-4 mb-8 text-[rgb(13,148,136)]">{destination.name}</h1>
          <div className="flex justify-center mb-8">
            <img
              src={destination.image_url}
              alt={destination.name}
              className="w-full max-w-[90%] h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              style={{ maxHeight: "70vh" }}
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-2"><strong>Country:</strong> {destination.country}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{destination.description}</p>
          <div className="flex justify-center mb-6">
            <button
              onClick={handleReviewClick}
              className="bg-[rgb(13,148,136)] text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transform transition duration-300"
            >
              Add Review
            </button>
          </div>
          {loginPrompt && (
            <p className="text-center text-red-600 mt-4">Please log in to add a review.</p>
          )}
          {/* Display reviews */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-gray-50 transition-shadow duration-300 hover:shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-[rgb(13,148,136)]">
                      Rating: {review.rating}/5
                    </p>
                    <p className="text-gray-500 text-sm">{review.user}</p>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {isModalOpen && (
            <AddReviewModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleReviewSubmit}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
