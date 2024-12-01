import { UserSearch } from '@/components/UserSearch';

export const Home = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='pt-5 fw-bold'>Desafio Front-End da Desbravador Software</h1>
            <h3 className='py-3'>Buscador de Usuários no Github</h3>
            <UserSearch />
        </div>
    );
};
