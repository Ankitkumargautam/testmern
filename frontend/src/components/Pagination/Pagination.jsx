import './Pagination.css';

const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  pageArray,
}) => {
  const limitArr = [2, 5, 6, 10, 15, 20];

  // Handler function to handle change in the selected limit
  const handleLimitChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };

  const nextPageHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const prevPageHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const startPageHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const lastPageHandler = async (e) => {
    e.preventDefault();
    setCurrentPage(totalPages);
  };

  const currentPageHandler = async (pageNo) => {
    console.log('page curr: ', pageNo);
    setCurrentPage(parseInt(pageNo));
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

      <div
        className="pagination__container-start"
        onClick={(e) => startPageHandler(e)}
      >
        &lt;&lt;
      </div>

      <button
        className="pagination__container-prev"
        onClick={(e) => prevPageHandler(e)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className="pagination__container-number">
        {pageArray.length < 6 &&
          pageArray.map((el) => {
            console.log(el, 'dd');
            return (
              <span
                className={currentPage === el ? 'active' : ''}
                key={el}
                onClick={() => currentPageHandler(el)}
              >
                {el}
              </span>
            );
          })}
        {pageArray.length >= 6 && currentPage > pageArray.length - 5
          ? pageArray
              .slice(pageArray.length - 5, pageArray.length - 1)
              .map((el) => {
                console.log(el, 'dd');
                return (
                  <span
                    className={currentPage === el ? 'active' : ''}
                    key={el}
                    onClick={() => currentPageHandler(el)}
                  >
                    {el}
                  </span>
                );
              })
          : pageArray.length >= 6 &&
            currentPage !== pageArray.length &&
            pageArray.slice(currentPage - 1, currentPage + 3).map((el) => {
              console.log(el, 'dd');
              return (
                <span
                  className={currentPage === el ? 'active' : ''}
                  key={el}
                  onClick={() => currentPageHandler(el)}
                >
                  {el}
                </span>
              );
            })}

        {pageArray.length >= 6 && (
          <>
            <>...</>
            <span
              className={currentPage === pageArray.length ? 'active' : ''}
              onClick={() => currentPageHandler(pageArray.length)}
            >
              {pageArray.length}
            </span>
          </>
        )}
      </div>
      <button
        className="pagination__container-next"
        onClick={(e) => nextPageHandler(e)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>

      <div
        className="pagination__container-end"
        onClick={(e) => lastPageHandler(e)}
      >
        &gt;&gt;
      </div>
    </div>
  );
};

export default Pagination;
