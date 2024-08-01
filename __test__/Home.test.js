import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';

describe('Home Component', () => {
    test('should render background image and button', () => {
        render(<Home />);

        // check background image
        const backgroundDiv = screen.getByTestId('background-div');
        expect(backgroundDiv).toHaveStyle({
            backgroundImage: 'url("https://www.sgclark.com/blog/wp-content/uploads/2023/03/starwars_starwars_new_hope_angled_stars.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
        });

        // check button
        const button = screen.getByText(/Go!/i);
        expect(button).toBeInTheDocument();
    });
});
