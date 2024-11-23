import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, description, id }) => {
  const navigate = useNavigate();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State to manage description expansion

  const handleViewMore = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsDescriptionExpanded((prev) => !prev); // Toggle the expanded state
    console.log("Navigating to:", id); // Log the id to the console
    navigate(`/destination/${id}`); // Navigate to the destination detail page
  };

  return (
    <div className="min-w-[280px] bg-white rounded-lg p-4 shadow-lg transform transition-transform hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p
        className={`text-sm text-gray-500 overflow-hidden ${isDescriptionExpanded ? "line-clamp-none" : "line-clamp-2"}`}
      >
        {description}
      </p>
      <button
        onClick={handleViewMore} // Call handleViewMore
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded transition-transform"
      >
        {isDescriptionExpanded ? "Show Less" : "View More"}
      </button>
    </div>
  );
};

export default Card;
