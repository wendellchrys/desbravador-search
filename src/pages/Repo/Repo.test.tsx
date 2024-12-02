import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Repo } from './';
import { getRepoDetails } from '@/services/api';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    getRepoDetails: jest.fn(),
}));

describe('Pages :: Repo', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ username: 'testuser', repoName: 'testrepo' });

        (getRepoDetails as jest.Mock).mockResolvedValue({
            name: 'testrepo',
            description: 'Descrição de exemplo',
            stargazers_count: 10,
            language: 'Typescript',
            created_at: '2023-01-01T13:00:00Z',
            updated_at: '2023-01-02T13:00:00Z',
            forks: 2,
            open_issues: 1,
            html_url: 'https://github.com/testuser/testrepo',
        });
    });

    it('should render the RepoDetails component with the correct parameters', async () => {
        render(
            <MemoryRouter>
                <Repo />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Mais Detalhes do Repositório')).toBeInTheDocument());

        expect(screen.getByText('Nome:')).toBeInTheDocument();
        expect(screen.getByText('testrepo')).toBeInTheDocument();
        expect(screen.getByText('Descrição:')).toBeInTheDocument();
        expect(screen.getByText('Descrição de exemplo')).toBeInTheDocument();
        expect(screen.getByText('Estrelas:')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Linguagem:')).toBeInTheDocument();
        expect(screen.getByText('Typescript')).toBeInTheDocument();
        expect(screen.getByText('Data da Criação:')).toBeInTheDocument();
        expect(screen.getByText('01/01/2023')).toBeInTheDocument();
        expect(screen.getByText('Última Atualização:')).toBeInTheDocument();
        expect(screen.getByText('02/01/2023')).toBeInTheDocument();
        expect(screen.getByText('Forks:')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('Issues Abertos:')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /Visualizar no GitHub/i })).toHaveAttribute('href', 'https://github.com/testuser/testrepo');

        expect(getRepoDetails).toHaveBeenCalledWith('testuser', 'testrepo');
    });

    it('should render RepoDetails with empty strings when username or repoName are undefined', async () => {
        (useParams as jest.Mock).mockReturnValue({ username: undefined, repoName: undefined });

        render(
            <MemoryRouter>
                <Repo />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Mais Detalhes do Repositório')).toBeInTheDocument());

        const repoDetailsProps = screen.getByTestId('repo-details');
        expect(repoDetailsProps).toHaveAttribute('data-username', '');
        expect(repoDetailsProps).toHaveAttribute('data-repo', '');
    });
});
