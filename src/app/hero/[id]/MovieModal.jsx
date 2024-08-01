import React from 'react';
import Modal from 'react-modal';
import 'tailwindcss/tailwind.css';

const MovieModal = ({ isOpen, onRequestClose, movie }) => {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Details"
      className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-3 right-5 text-gray-600 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Producer:</strong> {movie.producer}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Opening Crawl:</strong>
      </p>
      <p>{movie.opening_crawl}</p>
    </Modal>
  );
};

export default MovieModal;
