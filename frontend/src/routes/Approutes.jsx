import { Route, Routes } from 'react-router-dom';
import Employee from '../pages/employee/Employee';
import Home from '../pages/home/Home';
import Privateroute from './Privateroute';

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route element={<Privateroute />}>
        <Route path="/employee" element={<Employee />} />
      </Route>
    </Routes>
  );
};

export default Approutes;
