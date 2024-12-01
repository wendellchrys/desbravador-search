import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { User } from './';
import { getUserDetails, getUserRepos } from '@/services/api';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    getUserDetails: jest.fn(),
    getUserRepos: jest.fn(),
}));

describe('Pages :: User', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ username: 'testuser' });

        (getUserDetails as jest.Mock).mockResolvedValue({
            avatar_url: 'https://example.com/avatar.jpg',
            login: 'testuser',
            name: 'Nome Completo Exemplo',
            bio: 'Bio de Exemplo',
            followers: 100,
            following: 50,
            email: 'email@example.com',
        });

        (getUserRepos as jest.Mock).mockResolvedValue([
            { id: 1, name: 'Repo 1', stargazers_count: 10 },
            { id: 2, name: 'Repo 2', stargazers_count: 5 },
        ]);
    });

    it('should render the UserDetails and RepoList components with the correct parameters', async () => {
        render(
            <MemoryRouter>
                <User />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Detalhes do Usuário')).toBeInTheDocument());
        expect(screen.getByAltText('testuser')).toBeInTheDocument();
        expect(screen.getByText('Nome Completo Exemplo')).toBeInTheDocument();
        expect(screen.getByText('Bio de Exemplo')).toBeInTheDocument();
        expect(screen.getByText('Seguidores: 100')).toBeInTheDocument();
        expect(screen.getByText('Seguindo: 50')).toBeInTheDocument();
        expect(screen.getByText('Email: email@example.com')).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText('Descendente')).toBeInTheDocument());
        expect(screen.getByText('Repo 1')).toBeInTheDocument();
        expect(screen.getByText('- 10 estrelas')).toBeInTheDocument();
        expect(screen.getByText('Repo 2')).toBeInTheDocument();
        expect(screen.getByText('- 5 estrelas')).toBeInTheDocument();
        expect(screen.getAllByText('ver')).toHaveLength(2);

        expect(getUserDetails).toHaveBeenCalledWith('testuser');
        expect(getUserRepos).toHaveBeenCalledWith('testuser');
    });

    it('should render UserDetails and RepoList with empty strings when username is undefined', async () => {
        (useParams as jest.Mock).mockReturnValue({ username: undefined });

        render(
            <MemoryRouter>
                <User />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByTestId('user-details')).toBeInTheDocument());
        const userDetails = screen.getByTestId('user-details');
        const repoList = screen.getByTestId('repo-list');

        expect(userDetails).toHaveAttribute('data-username', '');
        expect(repoList).toHaveAttribute('data-username', '');
    });
});
