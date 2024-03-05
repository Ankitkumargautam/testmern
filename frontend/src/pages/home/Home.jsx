import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './style.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="home">
      {showLogin ? (
        <Register setShowLogin={setShowLogin} />
      ) : (
        <Login setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default Home;
