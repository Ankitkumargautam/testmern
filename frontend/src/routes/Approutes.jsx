import { Route, Routes } from 'react-router-dom';
import Employee from '../pages/employee/Employee';
import Home from '../pages/home/Home';
import Privateroute from './Privateroute';
import EmployeePage from '../pages/employeepage/EmployeePage';

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route element={<Privateroute />}>
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeePage" element={<EmployeePage />} />
      </Route>
    </Routes>
  );
};

export default Approutes;
