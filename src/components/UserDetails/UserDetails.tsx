import { useEffect, useState } from 'react';
import { getUserDetails } from '@/services/api';
import { Loading } from '@/components/Loading';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface UserDetailsProps {
    username: string;
}

interface User {
    avatar_url: string;
    login: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    email: string | null;
}

export const UserDetails = ({ username }: UserDetailsProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await getUserDetails(username);
                setUser(userData);
            } catch (err) {
                setError(getErrorMessage(err));
            }
        };

        fetchUserDetails();
    }, [username]);

    if (error) {
        return <div className="alert alert-danger" role="alert" data-testid="error-message">{error}</div>;
    }

    if (!user) return <Loading />;

    return (
        <div data-testid="user-details" data-username={username}>
            <h2>Detalhes do Usuário</h2>
            <div className="card mt-4 rounded-0 border-primary-subtle">
                <div className="row g-0">
                    <div className="col-md-4 p-3">
                        <img src={user.avatar_url} className="img-fluid rounded-circle" alt={user.login} data-testid="user-avatar" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title" data-testid="user-name">{user.name}</h4>
                            <p className="card-text" data-testid="user-bio">{user.bio}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" data-testid="user-followers">Seguidores: {user.followers}</li>
                                <li className="list-group-item" data-testid="user-following">Seguindo: {user.following}</li>
                                <li className="list-group-item" data-testid="user-email">Email: {user.email || 'Não informado'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
