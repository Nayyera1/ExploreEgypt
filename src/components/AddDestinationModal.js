import React from 'react';
import AddDestinationForm from './AddDestinationForm';

const AddDestinationModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null; // Only show modal if isOpen is true

  // This function handles closing the modal and refreshing the destinations
  const handleClose = () => {
    onClose(); // Call the original onClose to close the modal
    onAdd(); // Call onAdd to refresh the destinations
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <button onClick={handleClose} className="text-right mb-4 text-black">X</button>
        {/* Pass the onAdd function to AddDestinationForm */}
        <AddDestinationForm onAdd={onAdd} onClose={handleClose} />
      </div>
    </div>
  );
};

export default AddDestinationModal;
