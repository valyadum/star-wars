import Modal from 'react-modal';

const ShipModal = ({ isOpen, onRequestClose, ship }) => {
  if (!ship) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ship Details"
      className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-3 right-5 text-gray-600 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{ship.name}</h2>
      <p>
        <strong>Model:</strong> {ship.model}
      </p>
      <p>
        <strong>Manufacturer:</strong> {ship.manufacturer}
      </p>
      <p>
        <strong>Cost:</strong> {ship.cost_in_credits} credits
      </p>
      <p>
        <strong>Length:</strong> {ship.length} meters
      </p>
      <p>
        <strong>Crew:</strong> {ship.crew}
      </p>
      <p>
        <strong>Passengers:</strong> {ship.passengers}
      </p>
    </Modal>
  );
};
export default ShipModal;
