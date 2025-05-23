import React, { useState, useEffect } from 'react';
import styles from './Header_Table.module.css';
import sharedCss from '../Shared.module.css';
import { FaEdit } from 'react-icons/fa';
import DynamicFormOverlay from '../EditOverlay/EditOverlay';

const Header_Table = ({
  apiEndpoint = '/api/requests',
  title = "Accounting (Monthly)",
  profileName = "Derek Alvarado",
  initialPage = 1,
  itemsPerPage = 5,
  data = [
    { id: 1, techId: 'T1AM3', name: 'Ahmed', requests: 102, revenue: 'E£20,400', cut: 'E£14,280' },
    { id: 2, techId: 'T1AA21', name: 'Abdelrahim', requests: 103, revenue: 'E£20,600', cut: 'E£14,419' },
    { id: 3, techId: 'T1MS83', name: 'Mahmoud', requests: 104, revenue: 'E£20,800', cut: 'E£14,559' }
  ]
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
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

  const handleEditClick = (row) => {
    setEditData(row);
    setShowOverlay(true);
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
            placeholder="Search the technician by name or ID"
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
                <th>Tech ID</th>
                <th>Technician name</th>
                <th>No. of requests</th>
                <th>Revenue</th>
                <th>Technician's cut</th>
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
                  <td className={styles.techId}>{row.techId}</td>
                  <td>{row.name}</td>
                  <td>{row.requests}</td>
                  <td>{row.revenue}</td>
                  <td>{row.cut}</td>
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
            techId: 'text',
            name: 'text',
            requests: 'number',
            revenue: 'text',
            cut: 'text'
          }}
          initialValues={editData}
          onCancel={() => setShowOverlay(false)}
          onSubmit={(formData) => {
            console.log('Form submitted:', formData);
            setShowOverlay(false);
          }}
        />
      )}
    </div>
  );
};

export default Header_Table;
