import { Route, Routes } from 'react-router-dom';
import Employee from '../pages/employee/Employee';
import Home from '../pages/home/Home';

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
};

export default Approutes;
