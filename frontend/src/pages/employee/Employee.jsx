import { useEffect, useState } from 'react';
import { ContextState } from '../../Context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import './style.css';
import Popup from '../../components/EmployeeTable/Popup/Popup';

const Employee = () => {
  const { user } = ContextState();

  const [employeeData, setEmployeeData] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  useEffect(() => {
    if (user && user?.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const getData = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BASEURL}/api/getAllEmployee`,
            config
          );
          setEmployeeData(data?.data);
        } catch (error) {
          toast.error(
            error?.response?.data?.message || 'Failed to fetch employee data'
          );
        }
      };

      getData();
    }
    // eslint-disable-next-line
  }, [user && user?.token]);

  const createHandler = () => {
    setShowCreatePopup(true);
  };

  return (
    <div>
      <h1>Employee</h1>

      <div className="create-employee-button">
        <button onClick={() => createHandler()}>Create an employee</button>
      </div>

      {employeeData?.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <EmployeeTable
          employees={employeeData}
          setEmployeeData={setEmployeeData}
          showEditPopup={showEditPopup}
          setShowEditPopup={setShowEditPopup}
        />
      )}

      {showCreatePopup && (
        <Popup
          onClose={() => setShowCreatePopup(false)}
          setShowEditPopup={setShowCreatePopup}
          create={true}
          setEmployeeData={setEmployeeData}
          employeeData={employeeData}
        >
          {/* Pass any props or data required by the Popup component */}
          {/* You can pass editEmployee data to prefill the form */}
        </Popup>
      )}
    </div>
  );
};

export default Employee;
