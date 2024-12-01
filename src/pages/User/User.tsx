import { useParams } from 'react-router-dom';
import { UserDetails } from '@/components/UserDetails';
import { RepoList } from '@/components/RepoList';

export const User = () => {
    const { username } = useParams<{ username: string }>();

    return (
        <div className="container">
            <UserDetails username={username || ''} />
            <RepoList username={username || ''} />
        </div>
    );
};
