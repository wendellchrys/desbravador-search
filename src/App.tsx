import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { User } from './pages/User';
import { Repo } from './pages/Repo';
import './App.css';

export const App = () => {
  return (
    <div className="container vh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/repo/:username/:repoName" element={<Repo />} />
      </Routes>
    </div>
  );
};
