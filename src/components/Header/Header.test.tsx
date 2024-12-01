import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('Components :: Header', () => {
    const mockUseLocation = jest.fn();
    const mockUseNavigate = jest.fn();

    beforeEach(() => {
        mockUseLocation.mockReturnValue({ pathname: '/' });
        mockUseNavigate.mockReturnValue(jest.fn());

        (require('react-router-dom').useLocation as jest.Mock) = mockUseLocation;
        (require('react-router-dom').useNavigate as jest.Mock) = mockUseNavigate;
    });

    it('should render the broadcast icon link', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const broadcastLink = screen.getByRole('link', { name: /broadcast/i });
        expect(broadcastLink).toBeInTheDocument();
        expect(broadcastLink).toHaveAttribute('href', '/');
    });

    it('should not render the back button on the home page', () => {
        mockUseLocation.mockReturnValue({ pathname: '/' });

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const backButton = screen.queryByRole('button', { name: /voltar/i });
        expect(backButton).not.toBeInTheDocument();
    });

    it('should render the back button on non-home pages and handle click', () => {
        const navigate = jest.fn();
        mockUseLocation.mockReturnValue({ pathname: '/other' });
        mockUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const backButton = screen.getByRole('button', { name: /voltar/i });
        expect(backButton).toBeInTheDocument();

        fireEvent.click(backButton);
        expect(navigate).toHaveBeenCalledWith(-1);
    });
});
