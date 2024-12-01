import { render, screen, waitFor } from '@testing-library/react';
import { UserDetails } from './UserDetails';
import { getUserDetails } from '@/services/api';

jest.mock('@/services/api', () => ({
    getUserDetails: jest.fn(),
}));

jest.mock('@/utils/getErrorMessage', () => ({
    getErrorMessage: jest.fn().mockReturnValue('Erro ao carregar os detalhes do usuário'),
}));

describe('Components :: UserDetails', () => {
    const mockGetUserDetails = getUserDetails as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading spinner while fetching data', () => {
        mockGetUserDetails.mockReturnValue(new Promise(() => { }));

        render(<UserDetails username="testuser" />);

        const loadingMessages = screen.getAllByText('Carregando...');
        expect(loadingMessages).toHaveLength(2);
    });

    it('should render error message on API error', async () => {
        mockGetUserDetails.mockRejectedValue(new Error('Erro ao carregar os detalhes do usuário'));

        render(<UserDetails username="testuser" />);

        await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
        expect(screen.getByText('Erro ao carregar os detalhes do usuário')).toBeInTheDocument();
    });

    it('should render user details on successful fetch', async () => {
        mockGetUserDetails.mockResolvedValue({
            avatar_url: 'https://example.com/avatar.jpg',
            login: 'testuser',
            name: 'Nome Sobrenome',
            bio: 'Teste de Descrição',
            followers: 100,
            following: 50,
            email: 'test@example.com',
        });

        render(<UserDetails username="testuser" />);

        await waitFor(() => expect(screen.getByTestId('user-avatar')).toBeInTheDocument());

        expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
        expect(screen.getByTestId('user-name')).toHaveTextContent('Nome Sobrenome');
        expect(screen.getByTestId('user-bio')).toHaveTextContent('Teste de Descrição');
        expect(screen.getByTestId('user-followers')).toHaveTextContent('Seguidores: 100');
        expect(screen.getByTestId('user-following')).toHaveTextContent('Seguindo: 50');
        expect(screen.getByTestId('user-email')).toHaveTextContent('Email: test@example.com');
    });

    it('should render "Não informado" if email is null', async () => {
        mockGetUserDetails.mockResolvedValue({
            avatar_url: 'https://example.com/avatar.jpg',
            login: 'testuser',
            name: 'Nome Sobrenome',
            bio: 'Teste de Descrição',
            followers: 100,
            following: 50,
            email: null,
        });

        render(<UserDetails username="testuser" />);

        await waitFor(() => expect(screen.getByTestId('user-avatar')).toBeInTheDocument());

        expect(screen.getByTestId('user-email')).toHaveTextContent('Email: Não informado');
    });
});
