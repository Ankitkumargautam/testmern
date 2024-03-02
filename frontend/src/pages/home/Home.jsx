import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import useLogin from '../../hooks/useLogin';
import './style.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="home">
      {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Register setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default Home;