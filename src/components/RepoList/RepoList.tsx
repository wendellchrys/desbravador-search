import React, { useEffect, useState } from 'react';
import { getUserRepos } from '@/services/api';
import { Link } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { BsPlusCircleFill } from 'react-icons/bs';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface RepoListProps {
    username: string;
}

interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
}

export const RepoList = ({ username }: RepoListProps) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const sortRepos = (repos: Repo[], order: string) => {
        return [...repos].sort((a, b) => (order === 'desc' ? b.stargazers_count - a.stargazers_count : a.stargazers_count - b.stargazers_count));
    };

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            try {
                const response = await getUserRepos(username);
                const sortedRepos = sortRepos(response, sortOrder);
                setRepos(sortedRepos);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    const renderColumn = (repos: Repo[], start: number, end: number) => {
        const columnRepos = repos.slice(start, end);
        return (
            <div className="col-md-4">
                <ul className="list-group rounded-0">
                    {columnRepos.map((repo) => (
                        <li key={repo.id} className="list-group-item border-primary-subtle d-flex align-items-center" data-testid={`repo-${repo.id}`}>
                            <Link className='text-primary-emphasis' to={`/repo/${username}/${repo.name}`}>{repo.name}</Link> - {repo.stargazers_count} {repo.stargazers_count <= 1 ? 'estrela' : 'estrelas'}
                            <Link
                                className='d-none d-md-flex align-items-center bg-body-secondary text-primary-emphasis text-decoration-none ms-2 px-1 fs-6 rounded'
                                to={`/repo/${username}/${repo.name}`}
                            >
                                ver <BsPlusCircleFill className='ms-1' />
                            </Link>

                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div data-testid="repo-list" data-username={username}>
            <div className="form-group d-flex flex-column align-items-start w-100 w-lg-25">
                <select id="sortOrder" className="form-control form-select form-select-lg mb-3 rounded-0 border-primary-subtle" value={sortOrder} onChange={handleSortChange}>
                    <option value="desc">Descendente</option>
                    <option value="asc">Ascendente</option>
                </select>
            </div>
            {loading ? (
                <Loading />
            ) : (
                <div className="row">
                    {renderColumn(repos, 0, 10)}
                    {renderColumn(repos, 10, 20)}
                    {renderColumn(repos, 20, 30)}
                </div>
            )}
        </div>
    );
};
