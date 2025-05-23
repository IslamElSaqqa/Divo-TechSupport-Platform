import React, { useState, useEffect } from 'react';
import styles from './Header_Table.module.css';
import sharedCss from '../Shared.module.css';
import { FaEdit } from 'react-icons/fa';
import DynamicFormOverlay from '../EditOverlay/EditOverlay';
import Details from '../Details/Details';

const Header_Table = ({
  apiEndpoint = '/api/requests',
  title = "Service Requests",
  profileName = "Derek Alvarado",
  initialPage = 1,
  itemsPerPage = 5,
  data = [
    {
      techId: 'T1AM3',
      date: '06/06/23',
      requestCode: '#A002',
      name: 'Mohamed',
      type: 'Short',
      steps: '1- do a flop',
      description: '.....',
      note: 'This is ur fav guy',
      status: 'Completed ✅',
      instaID: 'E£200',
    },
    {
      techId: 'T1AM3',
      date: '06/06/23',
      requestCode: '#A003',
      name: 'Omar',
      type: 'Long',
      steps: '1- do a flop',
      description: '.....',
      note: 'This is ur fav guy',
      status: 'Completed ✅',
      instaID: 'E£350',
    },
    {
      techId: 'T1AM4',
      date: '06/06/23',
      requestCode: '#A001',
      name: 'Ahmed',
      type: 'Short',
      steps: '1- do a flop 1- do a flop 1- do a flop 1- do a flop 1- do a flop 1- do a flop',
      description: '.....',
      note: 'This is ur fav guy',
      status: 'In process',
      instaID: 'E£200',
    }
  ]
}) => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.map(item => item.requestCode));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleEditClick = (row) => {
    setEditData(row);
    setShowOverlay(true);
  };
  const handleDetailsClick = (row) => {
    setDetailsData(row);
    setShowDetails(true);
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, searchTerm, startDate, endDate, selectedFilter]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.profile}>
          <img src="https://dashboard.codeparrot.ai/api/image/Z9LSe5IdzXb5OlG8/rectangl.png" alt="Profile" className={styles.profileImg} />
          <span className={styles.profileName}>{profileName}</span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z9LSe5IdzXb5OlG8/chevron.png" alt="Chevron" className={styles.chevron} />
        </div>
      </div>
      <div className={sharedCss.innerDivArea}>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search the Request by name or ID"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.dateGroup}>
            <span>Start Date:</span>
            <input
              type="date"
              className={styles.dateInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className={styles.dateGroup}>
            <span>End Date:</span>
            <input
              type="date"
              className={styles.dateInput}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button className={styles.downloadBtn}>
            <span>Download</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9LSe5IdzXb5OlG8/group-33-5.png" alt="Download" />
          </button>

          <button className={styles.deleteBtn}>
            <span>Delete</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9LSe5IdzXb5OlG8/group-33-6.png" alt="Delete" />
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === data.length}
                  />
                  <span>All</span>
                </th>
                <th>Tech ID</th>
                <th>Date</th>
                <th>Request Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status (Click for tech note)</th>
                <th>instaID</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.requestCode} className={selectedItems.includes(row.requestCode) ? styles.selectedRow : ''}>
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.requestCode)}
                      onChange={() => handleSelectItem(row.requestCode)}
                    />
                  </td>
                  <td>{row.techId}</td>
                  <td>{row.date}</td>
                  <td>{row.requestCode}</td>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td><span onClick={() => handleDetailsClick(row)} style={{ cursor: 'pointer' }}>...</span></td>
                  <td>{row.status}</td>
                  <td>{row.instaID}</td>
                  <td>
                    <FaEdit
                      className={styles.editIcon}
                      onClick={() => handleEditClick(row)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className={styles.pageNumbers}>
            <span className={currentPage === 1 ? styles.active : ''}>1</span>
            <span className={currentPage === 2 ? styles.active : ''}>2</span>
            <span className={currentPage === 3 ? styles.active : ''}>3</span>
            <span>...</span>
            <span>7</span>
          </div>

          <button
            className={styles.paginationBtn}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>

          <div className={styles.pageSelect}>
            <span>{itemsPerPage}</span>
            <img src="https://dashboard.codeparrot.ai/api/image/Z9LSe5IdzXb5OlG8/group-33-7.png" alt="Select" className={styles.pageSelectIcon} />
          </div>
        </div>
      </div>

      {showOverlay && (
        <DynamicFormOverlay
          fieldsJson={{
            techId: 'text',
            date: 'text',
            requestCode: 'text',
            name: 'text',
            type: 'text',
            description: 'text',
            status: 'text',
            instaID: 'text'
          }}
          initialValues={editData}
          onCancel={() => setShowOverlay(false)}
          onSubmit={(formData) => {
            console.log('Form submitted:', formData);
            setShowOverlay(false);
          }}
        />
      )}

      {showDetails && (
        <Details
          fieldsJson={{
            steps: 'text',
            note: 'text',
            description: 'text'
          }}
          initialValues={detailsData}
          onCancel={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Header_Table;
