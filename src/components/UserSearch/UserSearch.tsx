import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { gitHubValidation } from '@/utils/githubValidation';

export const UserSearch = () => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (username && gitHubValidation(username)) {
      navigate(`/user/${username}`);
      setError('');
    } else {
      setError('Nome de usuário inválido. O nome deve seguir o padrão do GitHub.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="form-inline d-flex justify-content-between flex-column w-100">
      <div className="w-100 d-flex justify-content-between">
        <input
          type="text"
          className="form-control mb-2 me-2 py-3"
          placeholder="Usuário do Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
        <button type="submit" className="btn d-flex align-items-center btn-primary mb-2 h-auto" data-testid="search-button">
          <BsSearch className="me-2" /> Pesquisar
        </button>
      </div>
      {error && <small className="text-danger" data-testid="error-message">{error}</small>}
    </form>
  );
};
