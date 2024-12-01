import { render, screen } from '@testing-library/react';
import { Home } from './';

jest.mock('@/components/UserSearch', () => ({
    UserSearch: () => (
        <form className="form-inline d-flex justify-content-between flex-column w-100">
            <div className="w-100 d-flex justify-content-between">
                <input
                    type="text"
                    className="form-control mb-2 me-2 py-3"
                    placeholder="Usuário do Github"
                />
                <button type="submit" className="btn d-flex align-items-center btn-primary mb-2 h-auto">
                    Pesquisar
                </button>
            </div>
        </form>
    ),
}));

describe('Pages :: Home', () => {
    it('should render the title and subtitle', () => {
        render(<Home />);

        const titleElement = screen.getByText(/Desafio Front-End da Desbravador Software/i);
        expect(titleElement).toBeInTheDocument();

        const subtitleElement = screen.getByText(/Buscador de Usuários no Github/i);
        expect(subtitleElement).toBeInTheDocument();
    });

    it('should render the UserSearch component', () => {
        render(<Home />);

        const userSearchElement = screen.getByPlaceholderText(/Usuário do Github/i);
        expect(userSearchElement).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Pesquisar/i })).toBeInTheDocument();
    });
});
