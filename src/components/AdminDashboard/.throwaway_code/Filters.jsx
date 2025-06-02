import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters = ({ className }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  return (
    <div className={`${styles.container} ${className}`}>
      <h1 className={styles.title}>Servicing requests</h1>
      
      <div className={styles.filterControls}>
        <div className={styles.selectWrapper}>
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={styles.select}
          >
            <option value="">Select</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search the request by name or code"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.dateGroup}>
          <span className={styles.dateLabel}>Start Date :</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.dateInput}
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className={styles.dateGroup}>
          <span className={styles.dateLabel}>End Date :</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.dateInput}
            placeholder="dd/mm/yyyy"
          />
        </div>

        <button className={styles.actionButton}>Today</button>
        <button className={styles.actionButton}>Download</button>
        <button className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
      </div>
    </div>
  );
};

Filters.defaultProps = {
  className: '',
};

export default Filters;

