import { render, screen, waitFor } from '@testing-library/react';
import { RepoDetails } from './RepoDetails';
import { getRepoDetails } from '@/services/api';

jest.mock('@/services/api', () => ({
    getRepoDetails: jest.fn(),
}));

jest.mock('@/utils/getErrorMessage', () => ({
    getErrorMessage: jest.fn().mockReturnValue('Erro ao carregar os detalhes do repositório'),
}));

describe('Components :: RepoDetails', () => {
    const mockGetRepoDetails = getRepoDetails as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading spinner while fetching data', () => {
        mockGetRepoDetails.mockReturnValue(new Promise(() => { }));

        render(<RepoDetails username="testuser" repoName="testrepo" />);

        const loadingMessages = screen.getAllByText('Carregando...');
        expect(loadingMessages).toHaveLength(2);
    });

    it('should render error message on API error', async () => {
        mockGetRepoDetails.mockRejectedValue(new Error('Erro ao carregar os detalhes do repositório'));

        render(<RepoDetails username="testuser" repoName="testrepo" />);

        await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
        expect(screen.getByText('Erro ao carregar os detalhes do repositório')).toBeInTheDocument();
    });

    it('should render repository details on successful fetch', async () => {
        mockGetRepoDetails.mockResolvedValue({
            name: 'testrepo',
            description: 'Descrição de exemplo',
            stargazers_count: 10,
            language: 'JavaScript',
            html_url: 'https://github.com/testuser/testrepo',
            created_at: '2023-01-01',
            updated_at: '2023-01-02',
            forks: 2,
            open_issues: 1,
        });

        render(<RepoDetails username="testuser" repoName="testrepo" />);

        await waitFor(() => expect(screen.getByText('Mais Detalhes do Repositório')).toBeInTheDocument());

        expect(screen.getByTestId('repo-name')).toHaveTextContent('testrepo');
        expect(screen.getByTestId('repo-description')).toHaveTextContent('Descrição de exemplo');
        expect(screen.getByTestId('repo-stars')).toHaveTextContent('10');
        expect(screen.getByTestId('repo-language')).toHaveTextContent('JavaScript');
        expect(screen.getByTestId('repo-created-at')).toHaveTextContent('2023-01-01');
        expect(screen.getByTestId('repo-updated-at')).toHaveTextContent('2023-01-02');
        expect(screen.getByTestId('repo-forks')).toHaveTextContent('2');
        expect(screen.getByTestId('repo-open-issues')).toHaveTextContent('1');
        expect(screen.getByRole('link', { name: /Visualizar no GitHub/i })).toHaveAttribute('href', 'https://github.com/testuser/testrepo');
    });

    it('should render repository details on successful fetch', async () => {
        mockGetRepoDetails.mockResolvedValue({
            name: 'testrepo',
            description: null,
            stargazers_count: 10,
            language: 'JavaScript',
            html_url: 'https://github.com/testuser/testrepo',
            created_at: '2023-01-01',
            updated_at: '2023-01-02',
            forks: 0,
            open_issues: 0,
        });

        render(<RepoDetails username="testuser" repoName="testrepo" />);

        await waitFor(() => expect(screen.getByText('Mais Detalhes do Repositório')).toBeInTheDocument());

        expect(screen.getByTestId('repo-name')).toHaveTextContent('testrepo');
        expect(screen.getByTestId('repo-description')).toHaveTextContent('Sem descrição');
        expect(screen.getByTestId('repo-stars')).toHaveTextContent('10');
        expect(screen.getByTestId('repo-language')).toHaveTextContent('JavaScript');
        expect(screen.getByTestId('repo-created-at')).toHaveTextContent('2023-01-01');
        expect(screen.getByTestId('repo-updated-at')).toHaveTextContent('2023-01-02');
        expect(screen.getByTestId('repo-forks')).toHaveTextContent('0');
        expect(screen.getByTestId('repo-open-issues')).toHaveTextContent('0');
        expect(screen.getByRole('link', { name: /Visualizar no GitHub/i })).toHaveAttribute('href', 'https://github.com/testuser/testrepo');
    });

    it('should render "Repositório não encontrado" if repo is null', async () => {
        mockGetRepoDetails.mockResolvedValue(null);

        render(<RepoDetails username="testuser" repoName="testrepo" />);

        await waitFor(() => expect(screen.getByText('Repositório não encontrado')).toBeInTheDocument());
    });
});
