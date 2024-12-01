import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Components :: Loading', () => {
    it('should render the loading spinner and message', () => {
        render(<Loading />);

        const spinnerElement = screen.getByRole('status');
        expect(spinnerElement).toBeInTheDocument();

        const loadingMessages = screen.getAllByText('Carregando...');
        expect(loadingMessages).toHaveLength(2);

        expect(loadingMessages[0]).toBeInTheDocument();
        expect(loadingMessages[1]).toBeInTheDocument();
    });
});
