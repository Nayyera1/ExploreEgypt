import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DestinationDetail = () => {
	const { id } = useParams();
    
	const [destination, setDestination] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(1);

	useEffect(() => {
		const fetchDestination = async () => {
			const response = await axios.get(
				`http://localhost:5000/api/destinations/${id}`
			);
			setDestination(response.data.destination);
			setReviews(response.data.reviews);
		};
		fetchDestination();
	}, [id]);

	const handleAddReview = async () => {
		const userId = 1; // Replace with actual user ID from auth context
		await axios.post("http://localhost:5000/api/reviews", {
			destination_id: id,
			user_id: userId,
			review_text: reviewText,
			rating,
		});

		setReviewText("");
		setRating(1);

		// Re-fetch reviews
		const response = await axios.get(
			`http://localhost:5000/api/destinations/${id}`
		);

		setReviews(response.data.reviews);
	};

	if (!destination) return <div>Loading...</div>;

	return (
		<div>
			<h1>{destination.name}</h1>
			<p>{destination.description}</p>
			<h2>Reviews</h2>
			<div>
				{reviews.map((review) => (
					<div key={review.id}>
						<p>
							{review.review_text} - Rating: {review.rating}
						</p>
					</div>
				))}
			</div>
			<h3>Add a Review</h3>
			<textarea
				value={reviewText}
				onChange={(e) => setReviewText(e.target.value)}
			/>
			<input
				type="number"
				value={rating}
				min="1"
				max="5"
				onChange={(e) => setRating(Number(e.target.value))}
			/>
			<button onClick={() => handleAddReview()}>Submit Review</button>
		</div>
	);
};

export default DestinationDetail;
