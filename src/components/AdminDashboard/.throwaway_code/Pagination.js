import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage = 1, totalPages = 7, onPageChange }) => {
  const handlePageClick = (page) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Add first page
      pageNumbers.push(
        <button
          key={1}
          className={`${styles.pageNumber} ${currentPage === 1 ? styles.active : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      );

      // Add dots if needed
      if (currentPage > 3) {
        pageNumbers.push(<span key="dots1" className={styles.dots}>...</span>);
      }

      // Add current page and surrounding pages
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }

      // Add dots if needed
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="dots2" className={styles.dots}>...</span>);
      }

      // Add last page
      pageNumbers.push(
        <button
          key={totalPages}
          className={`${styles.pageNumber} ${currentPage === totalPages ? styles.active : ''}`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className={styles.pageNumbers}>
        {renderPageNumbers()}
      </div>
      <button
        className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <div className={styles.perPage}>
        <span className={styles.perPageText}>5</span>
      </div>
    </div>
  );
};

export default Pagination;

