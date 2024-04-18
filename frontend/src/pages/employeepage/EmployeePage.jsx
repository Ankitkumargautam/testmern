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
  const [pageArray, setPageArray] = useState([]);

  const [sortBy, setSortBy] = useState('name');
  const [sortValue, setSortValue] = useState(1);

  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (user && user?.token) {
      getData();
    }
    // eslint-disable-next-line
  }, [user?.token, currentPage]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage > 1 && employeeData?.length === 0]);

  const getData = async () => {
    if (user && user?.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/getEmpPage?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortValue=${sortValue}`,
          config
        );
        setEmployeeData(data?.data);
        // Calculate total pages based on total count and items per page
        const totalCount = data.total;
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        setTotalPages(totalPages);

        const pageNumbers = Array.from(
          { length: totalPages },
          (_, index) => index + 1
        );
        setPageArray([...pageNumbers]);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Failed to fetch employee data'
        );
      }
    }
  };

  const createHandler = () => {
    setShowCreatePopup(true);
  };

  const searchHandler = async () => {
    if (user && user?.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/getEmpPage?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortValue=${sortValue}&search=${searchKey}`,
          config
        );
        setEmployeeData(data?.data);
        // Calculate total pages based on total count and items per page
        const totalCount = data.total;
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        setTotalPages(totalPages);

        const pageNumbers = Array.from(
          { length: totalPages },
          (_, index) => index + 1
        );
        setPageArray([...pageNumbers]);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Failed to fetch employee data'
        );
      }
    }
  };

  return (
    <div className="employee-container">
      <h1>Employee</h1>
      <a href="/employee">go to Employee</a>

      <div className="create-employee-button">
        <button onClick={createHandler}>Create an employee</button>
      </div>
      <div className="search-employee">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button onClick={() => searchHandler()}>search</button>
      </div>
      {currentPage > 1 && employeeData?.length === 0 && (
        <h3>Reload for data...</h3>
      )}
      {currentPage === 1 && employeeData?.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <EmployeeTable
          employees={employeeData}
          setEmployeeData={setEmployeeData}
          showEditPopup={showEditPopup}
          setShowEditPopup={setShowEditPopup}
          getData={getData}
          setSortBy={setSortBy}
          setSortValue={setSortValue}
          sortValue={sortValue}
          sortBy={sortBy}
        />
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageArray={pageArray}
      />

      {showCreatePopup && (
        <Popup
          onClose={() => setShowCreatePopup(false)}
          setShowEditPopup={setShowCreatePopup}
          create={true}
          setEmployeeData={setEmployeeData}
          employeeData={employeeData}
          itemsPerPage={itemsPerPage}
        >
          {/* Pass any props or data required by the Popup component */}
          {/* You can pass editEmployee data to prefill the form */}
        </Popup>
      )}
    </div>
  );
};

export default EmployeePage;
