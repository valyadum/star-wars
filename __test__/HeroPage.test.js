// import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import HeroPage from '../src/app/hero/[id]/page';
// import { fetchHeroes, fetchFilmsInfo, fetchShipsInfo } from '../src/app/api';
// import { useParams } from 'next/navigation';
// import Modal from 'react-modal';

// jest.mock('../src/app/api', () => ({
//     fetchHeroes: jest.fn(),
//     fetchFilmsInfo: jest.fn(),
//     fetchShipsInfo: jest.fn(),
// }));

// Modal.setAppElement = jest.fn(); // Mock Modal.setAppElement

// test('should render hero page with unique keys', async () => {
//     fetchHeroes.mockResolvedValue({
//         name: 'Hero',
//         films: ['film1', 'film2'],
//         starships: ['ship1', 'ship2'],
//     });
//     fetchFilmsInfo.mockResolvedValue({
//         title: 'Film 1',
//         starships: ['ship1'],
//     });
//     fetchShipsInfo.mockResolvedValue({
//         name: 'Ship 1',
//         id: 'ship1',
//     });

//     render(<HeroPage />);

//     // expect(await screen.findByText('Loading...')).toBeInTheDocument();
//     expect(screen.getByText('Hero')).toBeInTheDocument();

//     // Wait for the loading to finish
//     await screen.findByText('Film 1');

//     // Ensure unique keys are used
//     const nodes = screen.getAllByTestId(/movie-/);
//     const keys = nodes.map(node => node.getAttribute('data-key'));
//     expect(new Set(keys).size).toBe(keys.length); // Ensure all keys are unique
// });