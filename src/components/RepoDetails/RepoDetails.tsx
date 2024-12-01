import { useEffect, useState } from 'react';
import { getRepoDetails } from '@/services/api';
import { Loading } from '@/components/Loading';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface RepoDetailsProps {
    username: string;
    repoName: string;
}

interface Repo {
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    forks: number;
    open_issues: number;
}

export const RepoDetails = ({ username, repoName }: RepoDetailsProps) => {
    const [repo, setRepo] = useState<Repo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            setLoading(true);
            try {
                const response = await getRepoDetails(username, repoName);
                setRepo(response);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };

        fetchRepoDetails();
    }, [username, repoName]);

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (loading) return <Loading />;

    if (!repo) return <div>Repositório não encontrado</div>;

    return (
        <div data-testid="repo-details" data-username={username} data-repo={repoName}>
            <h2>Mais Detalhes do Repositório</h2>
            <div className="card rounded-0 border-primary-subtle mt-4">
                <div className="card-body">
                    <h5 className="card-title"><strong>Nome:</strong> <span data-testid="repo-name">{repo.name}</span></h5>
                    <p className="card-text"><strong>Descrição:</strong> <span data-testid="repo-description">{repo.description || 'Sem descrição'}</span></p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Estrelas:</strong> <span data-testid="repo-stars">{repo.stargazers_count}</span></li>
                        <li className="list-group-item"><strong>Linguagem:</strong> <span data-testid="repo-language">{repo.language}</span></li>
                        <li className="list-group-item"><strong>Data da Criação:</strong> <span data-testid="repo-created-at">{repo.created_at}</span></li>
                        <li className="list-group-item"><strong>Última Atualização:</strong> <span data-testid="repo-updated-at">{repo.updated_at}</span></li>
                        <li className="list-group-item"><strong>Forks:</strong> <span data-testid="repo-forks">{repo.forks || 0}</span></li>
                        <li className="list-group-item"><strong>Issues Abertos:</strong> <span data-testid="repo-open-issues">{repo.open_issues || 0}</span></li>
                    </ul>
                    <a href={repo.html_url} className="btn btn-primary mt-2" target="_blank" rel="noopener noreferrer">
                        Visualizar no GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};
