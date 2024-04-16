import './Pagination.css';

const Pagination = ({ itemsPerPage, setItemsPerPage }) => {
  const numberArr = [1, 2, 3, 4, 5];
  const limitArr = [5, 10, 15, 20];
  // Handler function to handle change in the selected limit
  const handleLimitChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };
  console.log(itemsPerPage, 'itemsss');
  return (
    <div className="pagination__container">
      {/* Dropdown for selecting limit */}
      <select
        className="pagination__container-limit-dropdown"
        value={itemsPerPage}
        onChange={handleLimitChange}
      >
        {limitArr.map((limit) => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
      <div className="pagination__container-start"> &lt;&lt; </div>

      <div className="pagination__container-prev"> &lt; </div>
      <div className="pagination__container-number">
        {numberArr.map((el) => {
          return <span>{el}</span>;
        })}
      </div>
      <div className="pagination__container-next">&gt;</div>

      <div className="pagination__container-end"> &gt;&gt; </div>
    </div>
  );
};

export default Pagination;
