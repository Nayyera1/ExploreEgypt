import React, { useContext, useState } from "react";
import { UserContext } from "../utils/userContext";
import AddDestinationModal from "./AddDestinationModal";

const Navbar = ({ refreshDestinations }) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleAddDestination = async (destination) => {
    try {
      const response = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
      });

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }

      const data = await response.json();
      console.log("Destination added:", data);

      refreshDestinations();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };



  return (
    <nav className="bg-teal-600 p-4 flex justify-between items-center text-white">
      <header className="text-3xl font-bold">Explore Egypt</header>


      <ul className="flex gap-4 font-bold">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#contact-footer">Contact Us</a>
        </li>
        <li className="flex gap-2">
          {user ? (
            <>
              {user.admin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Add Destination
                  </button>
                </div>
              )}
              <a
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("_token");
                  location.reload();
                }}
              >
                Log Out
              </a>
            </>
          ) : (
            <>
              <a href="/login">Log In</a>
              <a href="/register">Register</a>
            </>
          )}
        </li>
      </ul>

      <AddDestinationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refreshDestinations();
        }} 
        onAdd={handleAddDestination} 
      />
    </nav>
  );
};

export default Navbar;
