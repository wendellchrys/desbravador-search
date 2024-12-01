export const Loading = () => {

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-secondary">Carregando...</p>
        </div>
    );
};
