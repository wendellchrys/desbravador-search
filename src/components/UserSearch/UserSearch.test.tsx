import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserSearch } from './UserSearch';
import { gitHubValidation } from '@/utils/githubValidation';

jest.mock('@/utils/githubValidation', () => ({
    gitHubValidation: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Components :: UserSearch', () => {
    const mockGitHubValidation = gitHubValidation as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should navigate to user details page on valid username', () => {
        mockGitHubValidation.mockReturnValue(true);

        render(
            <MemoryRouter>
                <UserSearch />
            </MemoryRouter>
        );

        const usernameInput = screen.getByTestId('username-input');
        const searchButton = screen.getByTestId('search-button');

        fireEvent.change(usernameInput, { target: { value: 'validusername' } });
        fireEvent.submit(searchButton.closest('form')!);

        expect(mockGitHubValidation).toHaveBeenCalledWith('validusername');
        expect(mockNavigate).toHaveBeenCalledWith('/user/validusername');
    });

    it('should display error message on invalid username', () => {
        mockGitHubValidation.mockReturnValue(false);

        render(
            <MemoryRouter>
                <UserSearch />
            </MemoryRouter>
        );

        const usernameInput = screen.getByTestId('username-input');
        const searchButton = screen.getByTestId('search-button');

        fireEvent.change(usernameInput, { target: { value: 'invalidusername' } });
        fireEvent.submit(searchButton.closest('form')!);

        expect(mockGitHubValidation).toHaveBeenCalledWith('invalidusername');
        expect(screen.getByTestId('error-message')).toHaveTextContent('Nome de usuário inválido. O nome deve seguir o padrão do GitHub.');
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should clear error message on valid username after invalid attempt', () => {
        mockGitHubValidation.mockReturnValueOnce(false).mockReturnValueOnce(true);

        render(
            <MemoryRouter>
                <UserSearch />
            </MemoryRouter>
        );

        const usernameInput = screen.getByTestId('username-input');
        const searchButton = screen.getByTestId('search-button');

        fireEvent.change(usernameInput, { target: { value: 'invalidusername' } });
        fireEvent.submit(searchButton.closest('form')!);

        expect(screen.getByTestId('error-message')).toHaveTextContent('Nome de usuário inválido. O nome deve seguir o padrão do GitHub.');

        fireEvent.change(usernameInput, { target: { value: 'validusername' } });
        fireEvent.submit(searchButton.closest('form')!);

        expect(mockGitHubValidation).toHaveBeenCalledWith('validusername');
        expect(mockNavigate).toHaveBeenCalledWith('/user/validusername');
        expect(screen.queryByTestId('error-message')).toBeNull();
    });
});
