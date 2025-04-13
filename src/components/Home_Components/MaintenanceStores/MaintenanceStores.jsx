import React from 'react';
import './MaintenanceStores.css';
import HelpDesk from '../HelpDesk/HelpDesk';
import FlashSales from '../Home-Stores/HomeStores';

const MaintenanceStores = () => {
  return (
    <div className="stores-container">
      <div className="header-section">
      </div>
      <FlashSales />
      <br></br>
      <HelpDesk />
    </div>
  );
};

export default MaintenanceStores;