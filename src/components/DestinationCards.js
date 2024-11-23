import React, { useState, useContext } from "react";
import Card from "./Card"; // Ensure this matches the path to Card.js
import { UserContext } from "../utils/userContext"; // Import UserContext
import AddDestinationModal from "./AddDestinationModal"; // Import the modal component
import EditDestinationModal from "./EditDestinationModal"; // Import the edit modal component

const DestinationCards = ({ destinations, onAdd, refreshDestinations }) => {
  const { user } = useContext(UserContext); // Get user context
  const [showForm, setShowForm] = useState(false);
  const [editDestination, setEditDestination] = useState(null); // State for the destination being edited
  const [showEditForm, setShowEditForm] = useState(false); // State to control edit modal visibility

  if (!destinations || Object.keys(destinations).length === 0) {
    return <p>No destinations available.</p>;
  }

  // Function to delete a destination
  const deleteDestination = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Destination deleted successfully");
        refreshDestinations(); // Call the function to refresh the list
      } else {
        console.error("Failed to delete destination");
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  // Function to handle editing a destination
  const handleEditDestination = (destination) => {
    setEditDestination(destination); // Set the destination to be edited
    setShowEditForm(true); // Open the edit modal
  };

  return (
    <div className="destination-cards relative">
      {Object.entries(destinations).map(([region, regionDestinations]) => (
        <div key={region}>
          <h2 className="text-2xl font-bold mt-8">{region}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regionDestinations.map((destination) => (
              <div key={destination._id} className="relative"> {/* Use _id for the key */}
                <Card
                  id={destination._id} // Ensure id is passed here
                  title={destination.name}
                  description={destination.description}
                  image={destination.image_url}
                />
                {user && user.admin && ( // Show edit and delete buttons for admin users
                  <div className="absolute top-2 right-2 flex gap-2 transition-transform transform hover:translate-y-1 hover:scale-110">
                    <button
                      onClick={() => handleEditDestination(destination)}
                      className="bg-yellow-500 text-white rounded px-2 transition-transform transform hover:-translate-y-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDestination(destination._id)}
                      className="bg-red-500 text-white rounded px-2 transition-transform transform hover:-translate-y-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Modal for adding destination */}
      <AddDestinationModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onAdd={onAdd} // Ensure the onAdd prop is passed
      />
      {/* Modal for editing destination */}
      <EditDestinationModal
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        destination={editDestination} // Pass the destination to be edited
        onEdit={refreshDestinations} // Call to refresh the destinations list after editing
      />
    </div>
  );
};

export default DestinationCards;
