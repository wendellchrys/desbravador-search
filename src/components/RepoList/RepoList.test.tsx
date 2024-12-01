import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RepoList } from './RepoList';
import { getUserRepos } from '@/services/api';

jest.mock('@/services/api', () => ({
    getUserRepos: jest.fn(),
}));

jest.mock('@/utils/errorHandler', () => ({
    getErrorMessage: jest.fn().mockReturnValue('Erro ao carregar os repositórios'),
}));

describe('Components :: RepoList', () => {
    const mockGetUserRepos = getUserRepos as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading spinner while fetching data', () => {
        mockGetUserRepos.mockReturnValue(new Promise(() => { }));

        render(
            <MemoryRouter>
                <RepoList username="testuser" />
            </MemoryRouter>
        );

        const loadingMessages = screen.getAllByText('Carregando...');
        expect(loadingMessages).toHaveLength(2);
    });

    it('should render error message on API error', async () => {
        mockGetUserRepos.mockRejectedValue(new Error('Erro ao carregar os repositórios'));

        render(
            <MemoryRouter>
                <RepoList username="testuser" />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
        expect(screen.getByText('Erro ao carregar os repositórios')).toBeInTheDocument();
    });

    it('should render repository list on successful fetch', async () => {
        mockGetUserRepos.mockResolvedValue([
            { id: 1, name: 'Repo 1', stargazers_count: 10 },
            { id: 2, name: 'Repo 2', stargazers_count: 5 },
        ]);

        render(
            <MemoryRouter>
                <RepoList username="testuser" />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Descendente')).toBeInTheDocument());

        expect(screen.getByTestId('repo-1')).toBeInTheDocument();
        expect(screen.getByTestId('repo-2')).toBeInTheDocument();
        expect(screen.getAllByText('ver')).toHaveLength(2);
    });

    it('should handle sort order change', async () => {
        mockGetUserRepos.mockResolvedValue([
            { id: 1, name: 'Repo 1', stargazers_count: 10 },
            { id: 2, name: 'Repo 2', stargazers_count: 5 },
            { id: 3, name: 'Repo 3', stargazers_count: 1 },
        ]);

        render(
            <MemoryRouter>
                <RepoList username="testuser" />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Descendente')).toBeInTheDocument());

        const sortOrderSelect = screen.getByRole('combobox');
        fireEvent.change(sortOrderSelect, { target: { value: 'asc' } });

        await waitFor(() => {
            expect(screen.getByTestId('repo-1')).toHaveTextContent('Repo 1');
            expect(screen.getByTestId('repo-1')).toHaveTextContent('10 estrelas');
            expect(screen.getByTestId('repo-2')).toHaveTextContent('Repo 2');
            expect(screen.getByTestId('repo-2')).toHaveTextContent('5 estrelas');
            expect(screen.getByTestId('repo-3')).toHaveTextContent('Repo 3');
            expect(screen.getByTestId('repo-3')).toHaveTextContent('1 estrela');
        });
    });
});
