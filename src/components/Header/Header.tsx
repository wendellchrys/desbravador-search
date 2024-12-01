import { BsBroadcast, BsChevronLeft } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <header className="bg-primary text-white p-3 mb-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div><Link className='text-white' to="/" aria-label="broadcast"><BsBroadcast size={30} /></Link></div>
                    <nav>
                        <ul className="nav">
                            {!isHome && (
                                <li className="nav-item">
                                    <button className="nav-link d-flex align-items-center text-white bg-transparent border-0" onClick={handleBackClick}>
                                        <BsChevronLeft /> Voltar
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
