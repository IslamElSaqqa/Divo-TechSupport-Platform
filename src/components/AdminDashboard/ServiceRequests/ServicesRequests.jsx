import React from 'react';
import Sidebar from '../SideBar/Sidebar';
import Header from './Header_Table';
import Table from './Header_Table';
// import Filters from './Filters';
// import Pagination from './throwaway_code/Pagination';
import styles from './ServicesRequests.module.css';

const ServicesRequests = () => {
  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.mainContent}>
        {/* <Header className={styles.header} /> */}
        {/* <Filters className={styles.filters} /> */}
        <Table className={styles.table} />
        {/* <Pagination className={styles.pagination} /> */}
      </div>
    </div>
  );
};

export default ServicesRequests;

