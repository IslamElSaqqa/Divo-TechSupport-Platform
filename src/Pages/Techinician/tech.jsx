import React, { useState, useEffect } from 'react';
import './App.css';
function Tech() {
  const technician = ''
  const techName = technician?.name || 'Loading...';
  const techSpecialization = technician?.specialization || 'Loading...';
  const techEmail = technician?.email || 'Loading...';
  const techPhone = technician?.phone_number || 'Loading...';
  const techImage = technician?.image_url || "https://i.pinimg.com/736x/69/72/31/697231a4de0d35e182ca377a448d8da5.jpg";

   // Sample data for the table with phone numbers
  const initialTableData = [
    {
      requestId: 1,
      requestTitle: "Fix Slow Boot Time",
      description: "My computer takes too long to start up. It stays on the loading screen for a while before getting to the desktop. I don't know what's causing it, but it's slowing me down. Can you help fix this?",
      requestDate: "2023-10-01",
      referenceId: "TXN1234567890",
      email: "user1@example.com",
      phone: "+1 (555) 123-4567",
      status: "Pending",
    },
    {
      requestId: 2,
      requestTitle: "Printer Not Working",
      description: "The office printer shows an error message and won't print any documents. I've tried restarting it but the issue persists.",
      requestDate: "2023-10-02",
      referenceId: "REF456",
      email: "user2@example.com",
      phone: "+1 (555) 234-5678",
      status: "Pending",
    },
    {
      requestId: 3,
      requestTitle: "Software Installation",
      description: "Need Adobe Creative Cloud installed on my workstation for graphic design work.",
      requestDate: "2023-10-03",
      referenceId: "REF789",
      email: "user3@example.com",
      phone: "+1 (555) 345-6789",
      status: "Accepted",
    },
    {
      requestId: 4,
      requestTitle: "Email Configuration",
      description: "Can't set up my email client with the new company email account.",
      requestDate: "2023-10-04",
      referenceId: "REF101",
      email: "user4@example.com",
      phone: "+1 (555) 456-7890",
      status: "Rejected",
    },
  ];

  const [tableData, setTableData] = useState(initialTableData);
  const [filteredData, setFilteredData] = useState(initialTableData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterData = (status) => {
    setActiveFilter(status);
    if (status === "All") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((row) => row.status === status);
      setFilteredData(filtered);
    }
    setShowDropdown(false);
  };

  const handleStatusChange = (requestId, newStatus) => {
    const updatedData = tableData.map(request => 
      request.requestId === requestId ? { ...request, status: newStatus } : request
    );
    setTableData(updatedData);
    setFilteredData(updatedData.filter(row => 
      activeFilter === "All" ? true : row.status === activeFilter
    ));
  };

  const handleRowClick = (request) => {
    setSelectedRequest(request);
  };

  const handleBack = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container">
      <div className="top-section">
        <div className="text-content">
          <h1>Technician Profile</h1>
          <div className="image-content">
            <img
              src={techImage}
              alt="Technician Avatar"
            />
          </div>
        </div>
        <div>
          <h2 className="Name">Name</h2>
          <p>{ techName}</p>
          <h2 className="Department">specialization</h2>
          <p>{techSpecialization}</p>
        </div>
        <div>
          <h2 className="Phone">Phone</h2>
          <p>{ techPhone}</p>
          <h2 className="Email">Email</h2>
          <p>{ techEmail}</p>
        </div>
      </div>

      <div className="bottom-section">
        <h2 className="customer-requests-heading">Customer Requests</h2>

        {!selectedRequest ? (
          <>
            <div className="filters">
              <button 
                onClick={() => filterData("All")}
                className={activeFilter === "All" ? "active" : ""}
              >
                All Requests
              </button>
              
              <div className="dropdown">
                <button 
                  className={`dropdown-toggle ${activeFilter !== "All" ? "active" : ""}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {activeFilter === "All" ? "Filter by Status" : activeFilter + " Requests"}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => filterData("Pending")}>Pending</button>
                    <button onClick={() => filterData("Accepted")}>Accepted</button>
                    <button onClick={() => filterData("Rejected")}>Rejected</button>
                  </div>
                )}
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Request Title</th>
                    <th>Description</th>
                    <th>Request Date</th>
                    <th>Reference ID</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.requestId}>
                      <td>{row.requestId}</td>
                      <td>{row.requestTitle}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRowClick(row);
                          }}
                        >
                          View Details
                        </a>
                      </td>
                      <td>{row.requestDate}</td>
                      <td>{row.referenceId}</td>
                      <td>{row.email}</td>
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>
                        {row.status === "Pending" && (
                          <div className="action-buttons">
                            <button
                              className="accept-btn"
                              onClick={() => handleStatusChange(row.requestId, "Accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() => handleStatusChange(row.requestId, "Rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {row.status !== "Pending" && (
                          <button
                            className="reset-btn"
                            onClick={() => handleStatusChange(row.requestId, "Pending")}
                          >
                            Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="request-details">
            <button onClick={handleBack} className="back-button">
              Back to Table
            </button>
            <h3>Request Details</h3>
            <div className="detail-item">
              <strong>Request ID:</strong> {selectedRequest.requestId}
            </div>
            <div className="detail-item">
              <strong>Request Title:</strong> {selectedRequest.requestTitle}
            </div>
            <div className="detail-item">
              <strong>Description:</strong> {selectedRequest.description}
            </div>
            <div className="detail-item">
              <strong>Request Date:</strong> {selectedRequest.requestDate}
            </div>
            <div className="detail-item">
              <strong>Reference ID:</strong> {selectedRequest.referenceId}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {selectedRequest.email}
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> {selectedRequest.phone}
            </div>
            <div className="detail-item">
              <strong>Status:</strong> 
              <span className={`status-badge ${selectedRequest.status.toLowerCase()}`}>
                {selectedRequest.status}
              </span>
            </div>
            
            {/* Added images section */}
            <div className="detail-item">
              <strong>Attachments:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <img 
                  src="https://cdn-ilalkbd.nitrocdn.com/FarPNdpFBRtkiJviAsBGjVXNCdUeAZKT/assets/images/optimized/rev-44873f3/leanstartup.co/wp-content/uploads/2017/10/board-361516_1920.jpg" 
                  alt="Attachment 1" 
                  style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <img 
                  src="https://cdn-ilalkbd.nitrocdn.com/FarPNdpFBRtkiJviAsBGjVXNCdUeAZKT/assets/images/optimized/rev-44873f3/leanstartup.co/wp-content/uploads/2017/10/board-361516_1920.jpg" 
                  alt="Attachment 2" 
                  style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {selectedRequest.status === "Pending" && (
              <div className="detail-actions">
                <button
                  className="accept-btn"
                  onClick={() => {
                    handleStatusChange(selectedRequest.requestId, "Accepted");
                    handleBack();
                  }}
                >
                  Accept Request
                </button>
                <button
                  className="reject-btn"
                  onClick={() => {
                    handleStatusChange(selectedRequest.requestId, "Rejected");
                    handleBack();
                  }}
                >
                  Reject Request
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tech;