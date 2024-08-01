import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Hero from '../src/app/hero/page.jsx';

// Mock axios
jest.mock('axios');

const mockHeroes = [
    { id: '1', name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
    { id: '2', name: 'Darth Vader', height: '202', mass: '136', gender: 'male' },
];

describe('Hero Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: { results: mockHeroes } });

        render(<Hero />);

        expect(screen.getByText('Heroes of the Star Wars')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Darth Vader')).toBeInTheDocument());
    });

    it('loads more heroes when "Load more..." button is clicked', async () => {
        axios.get.mockResolvedValueOnce({ data: { results: mockHeroes } });

        render(<Hero />);

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());

        axios.get.mockResolvedValueOnce({ data: { results: mockHeroes } });

        const loadMoreButton = screen.getByText('Load more...');
        fireEvent.click(loadMoreButton);

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(screen.getAllByText('Luke Skywalker').length).toBe(2));
    });

    it('displays error message on fetch failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Hero />);

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument());
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        expect(screen.getByText('Error fetching heroes: Failed to fetch')).toBeInTheDocument();
    });
});