import React, { useState, useEffect } from 'react';

const EditDestinationModal = ({ isOpen, onClose, destination, onEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (destination) {
      setName(destination.name);
      setDescription(destination.description);
      setImageUrl(destination.image_url);
      setCountry(destination.country);
    }
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDestination = {
      name,
      description,
      image_url: imageUrl,
      country,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/destinations`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: destination.name, updatedData: updatedDestination }),
      });

      if (response.ok) {
        console.log("Destination updated successfully");
        onEdit(); // Call to refresh the destinations list
        onClose(); // Close the modal after editing
      } else {
        console.error("Failed to update destination");
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <button onClick={onClose} className="text-right mb-4 text-black">X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-black border rounded p-2 w-full"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="text-black border rounded p-2 w-full"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="text-black border rounded p-2 w-full"
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="text-black border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-green-500 border border-black text-white rounded p-2 mt-4">
            Update Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDestinationModal;
