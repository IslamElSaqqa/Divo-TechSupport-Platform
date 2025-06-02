import React from 'react';
import Sidebar from '../SideBar/Sidebar';
import Header from './Header';
import Statistics_DataTable from './Statistics_DataTable';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.innerDivArea}>
          <Header />
        
        <div className={styles.contentArea}>
          <Statistics_DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

