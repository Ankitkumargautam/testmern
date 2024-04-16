import { useEffect, useState } from 'react';
import { ContextState } from '../../Context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import './style.css';
import Popup from '../../components/EmployeeTable/Popup/Popup';
import Pagination from '../../components/Pagination/Pagination';

const EmployeePage = () => {
  const { user } = ContextState();

  const [employeeData, setEmployeeData] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
            `${process.env.REACT_APP_BASEURL}/api/getEmpPage?page=${currentPage}&limit=${itemsPerPage}`,
            config
          );
          setEmployeeData(data?.data);
          // Calculate total pages based on total count and items per page
          const totalCount = data.total;
          const totalPages = Math.ceil(totalCount / itemsPerPage);
          setTotalPages(totalPages);

          console.log('data: ', data);
          console.log('totalPages: ', totalPages);
        } catch (error) {
          toast.error(
            error?.response?.data?.message || 'Failed to fetch employee data'
          );
        }
      };

      getData();
    }
    // eslint-disable-next-line
  }, [user?.token, currentPage]);

  const createHandler = () => {
    setShowCreatePopup(true);
  };

  return (
    <div>
      <h1>Employee</h1>
      <a href="/employee">go to Employee</a>

      <div className="create-employee-button">
        <button onClick={createHandler}>Create an employee</button>
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

      <Pagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

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

export default EmployeePage;
