import React, { useState } from 'react';

const AddDestinationForm = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDestination = {
      name,
      description,
      image_url: imageUrl,
      country,
    };

    try {
      const response = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDestination),
      });

      if (response.ok) {
        console.log("Destination added successfully");
        onAdd(); // Call the refresh function to update the list of destinations
        onClose(); // Close the modal
        // Optionally reset the form fields
        setName('');
        setDescription('');
        setImageUrl('');
        setCountry('');
      } else {
        console.error("Failed to add destination");
      }
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Add some spacing between form elements */}
  <div>
    <label className="text-black">Name</label> {/* Set label text color to black */}
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      className="text-black border rounded p-2 w-full" // Set input text color to black
    />
  </div>
  <div>
    <label className="text-black">Description</label> {/* Set label text color to black */}
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="text-black border rounded p-2 w-full" // Set textarea text color to black
    />
  </div>
  <div>
    <label className="text-black">Image URL</label> {/* Set label text color to black */}
    <input
      type="url"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      required
      className="text-black border rounded p-2 w-full" // Set input text color to black
    />
  </div>
  <div>
    <label className="text-black">Country</label> {/* Set label text color to black */}
    <input
      type="text"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      required
      className="text-black border rounded p-2 w-full" // Set input text color to black
    />
  </div>
  <button type="submit" className="bg-blue-500 text-black rounded p-2">Add Destination</button> {/* Button with black text */}
</form>

  );
};

export default AddDestinationForm;
