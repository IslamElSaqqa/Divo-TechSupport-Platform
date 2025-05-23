import React, { useState, useEffect } from 'react';
import styles from './Header_Table.module.css';
import sharedCss from '../Shared.module.css';
import { FaEdit } from 'react-icons/fa';
import DynamicFormOverlay from '../EditOverlay/EditOverlay';
import Details from '../Details/Details';

// const HeaderTable = ({ apiEndpoint = '/api/requests' }) => {
//   const [requests, setRequests] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('All');

//   useEffect(() => {
//     // Fetch data from API
//     fetchRequests();
//   }, [currentPage, searchTerm, startDate, endDate, selectedFilter]);

//   const fetchRequests = async () => {
//     try {
//       // Mock API call - replace with actual API endpoint
//       const response = await fetch(apiEndpoint);
//       const data = await response.json();
//       setRequests(data);
//     } catch (error) {
//       console.error('Error fetching requests:', error);
//     }
//   };
//   };


const Header_Table = ({
  apiEndpoint = '/api/requests',
  title = "Service Requests",
  profileName = "Derek Alvarado",
  initialPage = 1,
  itemsPerPage = 5,
  data = [
    { id: 1, code: '0x216', description: 'Arithmetic result exceeded 32 bits.', solution: 'Do this and this and that 1' },
    { id: 2, code: '0x217', description: 'There is a process on other end of the pipe.', solution: 'Do this and this and that 2' },
    { id: 3, code: '0x218', description: 'Waiting for a process to open the other end of the pipe.', solution: 'Do this and this and that 3' }
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
  const [showDetails, setShowDetails] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.map(item => item.id));
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

  useEffect(() => {
    // Fetch data from API
    fetchRequests();
  }, [currentPage, searchTerm, startDate, endDate, selectedFilter]);

  const fetchRequests = async () => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleEditClick = (row) => {
    setEditData(row);
    setShowOverlay(true);
  };
  const handleDetailsClick = (row) => {
    setEditData(row);
    setShowDetails(true);
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

          <div className={styles.addButton}>
            <span>Add</span>
            <img className={styles.addImg} src="https://dashboard.codeparrot.ai/api/image/Z9MAtCppvFKitUEH/image-90.png" alt="add" />
          </div>

          <input
            type="text"
            placeholder="Search the Shop by name or ID"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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
                <th>No.</th>
                <th>Win Err Code</th>
                <th>Win Err Description</th>
                <th>Win Err Sol</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id} className={selectedItems.includes(row.id) ? styles.selectedRow : ''}>
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => handleSelectItem(row.id)}
                    />
                  </td>
                  <td>{row.id}</td>
                  <td>{row.code}</td>
                  <td>{row.description}</td>
                  <td><span onClick={() => handleDetailsClick(row)} style={{ cursor: 'pointer' }}>...</span></td>
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
            id: 'number',
            code: 'text',
            description: 'text',
            solution: 'text'
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
            solution: 'text'
          }}
          initialValues={editData}
          onCancel={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Header_Table;
