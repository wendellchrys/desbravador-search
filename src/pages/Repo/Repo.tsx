import { useParams } from 'react-router-dom';
import { RepoDetails } from '@/components/RepoDetails';

export const Repo = () => {
    const { username, repoName } = useParams<{ username: string; repoName: string }>();

    return (
        <div className="container">
            <RepoDetails username={username || ''} repoName={repoName || ''} />
        </div>
    );
};
