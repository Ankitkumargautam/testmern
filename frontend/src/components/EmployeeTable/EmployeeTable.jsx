import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContextState } from '../../Context/ContextProvider';
import './EmployeeTable.css';
import Popup from './Popup/Popup';

const EmployeeTable = ({
  employees,
  setEmployeeData,
  showEditPopup,
  setShowEditPopup,
  getData,
  setSortBy,
  setSortValue,
  sortValue,
  sortBy,
}) => {
  const { user } = ContextState();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const [currentId, setCurrentId] = useState(0);
  const [updateEmployeeData, setUpdateEmployeeData] = useState({});

  // Trigger sorting when sortBy or sortValue changes
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortValue]);

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
      getData();
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to fetch employee data'
      );
    }
  };

  const sortTable = (sort) => {
    setSortBy(sort);
    setSortValue(sortValue === 1 ? -1 : 1); // Toggle sort value
  };

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <div
                onClick={() => sortTable('name')}
                style={{ cursor: 'pointer' }}
              >
                Name
                {sortBy === 'name' && sortValue === 1 ? (
                  <>&#708;</>
                ) : (
                  sortBy === 'name' && sortValue === -1 && <>&#709;</>
                )}
              </div>
            </th>
            <th>
              <div
                onClick={() => sortTable('email')}
                style={{ cursor: 'pointer' }}
              >
                Email
                {sortBy === 'email' && sortValue === 1 ? (
                  <>&#708;</>
                ) : (
                  sortBy === 'email' && sortValue === -1 && <>&#709;</>
                )}
              </div>
            </th>
            <th>
              <div
                onClick={() => sortTable('phone')}
                style={{ cursor: 'pointer' }}
              >
                Phone
                {sortBy === 'phone' && sortValue === 1 ? (
                  <>&#708;</>
                ) : (
                  sortBy === 'phone' && sortValue === -1 && <>&#709;</>
                )}
              </div>
            </th>
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
          // setUpdateEmployeeData={setUpdateEmployeeData}
        >
          {/* Pass any props or data required by the Popup component */}
          {/* You can pass editEmployee data to prefill the form */}
        </Popup>
      )}
    </div>
  );
};

export default EmployeeTable;
