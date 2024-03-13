import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ContextState } from '../../Context/ContextProvider';
import './EmployeeTable.css';
import Popup from './Popup/Popup';

const EmployeeTable = ({
  employees,
  setEmployeeData,
  showEditPopup,
  setShowEditPopup,
}) => {
  const { user } = ContextState();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const [currentId, setCurrentId] = useState(0);
  const [updateEmployeeData, setUpdateEmployeeData] = useState({});

  const editHandler = (employee) => {
    setShowEditPopup(true);
    setCurrentId(employee._id);
    setUpdateEmployeeData(employee);
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/removeEmployee/${id}`,
        config
      );

      setEmployeeData(employees.filter((emp) => emp._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to fetch employee data'
      );
    }
  };

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button onClick={() => editHandler(employee)}>Edit</button>
                <button onClick={() => deleteHandler(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditPopup && (
        <Popup
          onClose={() => setShowEditPopup(false)}
          setShowEditPopup={setShowEditPopup}
          create={false}
          setEmployeeData={setEmployeeData}
          employeeData={employees}
          currentId={currentId}
          setCurrentId={setCurrentId}
          updateEmployeeData={updateEmployeeData}
          setUpdateEmployeeData={setUpdateEmployeeData}
        >
          {/* Pass any props or data required by the Popup component */}
          {/* You can pass editEmployee data to prefill the form */}
        </Popup>
      )}
    </div>
  );
};

export default EmployeeTable;
