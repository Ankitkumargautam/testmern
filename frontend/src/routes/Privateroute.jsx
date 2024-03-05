import { Navigate, Outlet } from 'react-router-dom';

const Privateroute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return user?.token ? <Outlet /> : <Navigate to="/" />;
};

export default Privateroute;
