import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { useGetTechnicianProfile } from "../../Hooks/Technician/useGetTechnicianData";
import { useTechnicianContext } from "../../Hooks/Technician/useTechnicianContext";

const Technician = () => {
  const [page, setPage] = useState(1);
  const { getTechnician, isLoading } = useGetTechnicianProfile();
  const { technician } = useTechnicianContext();

  // Profile states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [techImage, setTechImage] = useState("");

  // Data states
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Fetch technician profile
  useEffect(() => {
    if (!technician?.token || !technician?._id || profileFetched) return;

    const fetchTechProfile = async () => {
      const profile = await getTechnician();
      if (profile) {
        setName(profile.name || "");
        setEmail(profile.email || "");
        setPhone(profile.phone_number || "");
        setTechImage(
          profile.image_url ||
            "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748907333/gnxjl4smryaxenstarj8.jpg"
        );
        setSpecialization(profile.specialization || "");
        setProfileFetched(true);
      }
    };

    fetchTechProfile();
  }, [technician, profileFetched, getTechnician]);

  // Fetch data based on filter using new technician-specific endpoint
  const fetchData = async (filter = "Pending", currentPage = 1) => {
    if (!technician?.token) return;

    setDataLoading(true);
    try {
      let url = `/api/helpSession/technician/sessions?page=${currentPage}&limit=10`;

      // Add status filter
      if (filter !== "All") {
        url += `&status=${filter.toLowerCase()}`;

        // For accepted/rejected, add technicianId to filter by assigned sessions
        if (filter === "Accepted" || filter === "Rejected") {
          url += `&technicianId=${technician._id}`;
        }
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${technician.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        setPagination(result.pagination);
        setFilteredData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (technician?.token && profileFetched) {
      fetchData(activeFilter, page);
    }
  }, [technician, profileFetched, page]);

  const filterData = (status) => {
    setActiveFilter(status);
    setPage(1); // Reset to first page
    fetchData(status, 1);
    setShowDropdown(false);
  };

  // Updated status change using new endpoint
  const handleStatusChange = async (requestId, newStatus) => {
    if (!technician?.token) return;

    try {
      const response = await fetch(
        `/api/helpSession/technician/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${technician.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.ok) {
        // Refresh data after status change
        fetchData(activeFilter, page);
      } else {
        const errorData = await response.json();
        console.error("Failed to update status:", errorData.error);
        alert(`Failed to update status: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  // Updated type change using new endpoint
  const handleTypeChange = async (requestId, newType) => {
    if (!technician?.token) return;

    try {
      const response = await fetch(
        `/api/helpSession/technician/${requestId}/type`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${technician.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: newType,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        // Update local state
        const updatedData = data.map((request) =>
          request._id === requestId ? { ...request, type: newType } : request
        );
        setData(updatedData);
        setFilteredData(updatedData);

        // Update selected request if it's the current one
        if (selectedRequest?._id === requestId) {
          setSelectedRequest({ ...selectedRequest, type: newType });
        }
        setSelectedType(newType);
      } else {
        const errorData = await response.json();
        console.error("Failed to update type:", errorData.error);
        alert(`Failed to update type: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating type:", error);
      alert("Error updating type. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination?.pages) {
      setPage(newPage);
    }
  };

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setSelectedType(request.type || null);
  };

  const handleBack = () => {
    setSelectedRequest(null);
    setSelectedType(null);
  };

  const handleAddNote = () => {
    // Check if current technician is assigned to this session
    if (
      !selectedRequest ||
      selectedRequest.specialist?._id !== technician._id
    ) {
      alert("You can only add notes to sessions assigned to you.");
      return;
    }
    setShowNotePopup(true);
  };

  // Updated note submission using new endpoint
  const handleNoteSubmit = async () => {
    if (!newNote.trim() || !selectedRequest || !technician?.token) return;

    try {
      const response = await fetch(
        `/api/helpSession/technician/${selectedRequest._id}/note`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${technician.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note: newNote.trim(),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        // Update local state with the new note
        const updatedData = data.map((request) =>
          request._id === selectedRequest._id
            ? { ...request, note: result.data.note }
            : request
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setSelectedRequest({ ...selectedRequest, note: result.data.note });

        setNewNote("");
        setShowNotePopup(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to add note:", errorData.error);
        alert(`Failed to add note: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Error adding note. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.topSection}>
            <div className={styles.avatarContainer}>
              <img
                src={techImage}
                alt="Technician Avatar"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.detailsContainer}>
              <h1 className={styles.sectionTitle}>Technician Profile</h1>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <h2 className={styles.detailLabel}>Name</h2>
                  <p className={styles.detailValue}>{name}</p>
                </div>
                <div className={styles.detailItem}>
                  <h2 className={styles.detailLabel}>Department</h2>
                  <p className={styles.detailValue}>{specialization}</p>
                </div>
                <div className={styles.detailItem}>
                  <h2 className={styles.detailLabel}>Phone</h2>
                  <p className={styles.detailValue}>{phone}</p>
                </div>
                <div className={styles.detailItem}>
                  <h2 className={styles.detailLabel}>Email</h2>
                  <p className={styles.detailValue}>{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <h2 className={styles.customerRequestsHeading}>
              Customer Requests
            </h2>
            {dataLoading && <div>Loading requests...</div>}

            {!selectedRequest ? (
              <>
                <div className={styles.filters}>
                  <button
                    onClick={() => filterData("Pending")}
                    className={`${styles.filtersButton} ${
                      activeFilter === "Pending" ? styles.activeFilter : ""
                    }`}
                  >
                    All Requests
                  </button>
                  <div className={styles.dropdown}>
                    <button
                      className={`${styles.dropdownToggle} ${
                        activeFilter !== "All" ? styles.activeFilter : ""
                      }`}
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {activeFilter === "All"
                        ? "Filter by Status"
                        : activeFilter + " Requests"}
                    </button>
                    {showDropdown && (
                      <div className={styles.dropdownMenu}>
                        <button
                          className={styles.dropdownMenuButton}
                          onClick={() => filterData("Pending")}
                        >
                          Pending
                        </button>
                        <button
                          className={styles.dropdownMenuButton}
                          onClick={() => filterData("Accepted")}
                        >
                          Accepted
                        </button>
                        <button
                          className={styles.dropdownMenuButton}
                          onClick={() => filterData("Rejected")}
                        >
                          Rejected
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.tableContainer}>
                  <table className={styles.fullWidthTable}>
                    <thead>
                      <tr className={styles.tableHeader}>
                        <th className={styles.tableHeaderCell}>Request ID</th>
                        <th className={styles.tableHeaderCell}>Description</th>
                        <th className={styles.tableHeaderCell}>Request Date</th>
                        <th className={styles.tableHeaderCell}>Reference ID</th>
                        <th className={styles.tableHeaderCell}>Status</th>
                        <th className={styles.tableHeaderCell}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row) => (
                        <tr key={row._id} className={styles.tableRow}>
                          <td className={styles.tableCell}>{row._id}</td>
                          <td className={styles.tableCell}>
                            <a
                              href="#"
                              className={styles.detailLink}
                              onClick={(e) => {
                                e.preventDefault();
                                handleRowClick(row);
                              }}
                            >
                              View Details
                            </a>
                          </td>
                          <td className={styles.tableCell}>
                            {new Date(row.createdAt).toLocaleDateString()}
                          </td>
                          <td className={styles.tableCell}>
                            {row.instapay_reference || "N/A"}
                          </td>
                          <td className={styles.tableCell}>
                            <span
                              className={`${styles.statusBadge} ${
                                row.status.toLowerCase() === "pending"
                                  ? styles.statusBadgePending
                                  : row.status.toLowerCase() === "accepted"
                                  ? styles.statusBadgeAccepted
                                  : styles.statusBadgeRejected
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            {row.status === "pending" ? (
                              <div className={styles.actionButtons}>
                                <button
                                  className={styles.acceptButton}
                                  onClick={() =>
                                    handleStatusChange(row._id, "accepted")
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className={styles.rejectButton}
                                  onClick={() =>
                                    handleStatusChange(row._id, "rejected")
                                  }
                                >
                                  Reject
                                </button>
                              </div>
                            ) : row.status === "rejected" ? (
                              <div className={styles.rejectButton}>
                                Rejected
                              </div>
                            ) : (
                              <button
                                className={styles.resetButton}
                                onClick={() =>
                                  handleStatusChange(row._id, "rejected")
                                }
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {pagination && (
                  <div className={styles.paginationControls}>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === pagination.pages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.requestDetails}>
                <div className={styles.detailActionsTop}>
                  <button onClick={handleBack} className={styles.backButton}>
                    Back to Table
                  </button>
                  <button
                    onClick={handleAddNote}
                    className={styles.addNoteButton}
                  >
                    Add Note
                  </button>
                </div>
                <h3>Request Details</h3>
                <div className={styles.detailItem}>
                  <strong>ID:</strong> {selectedRequest._id}
                </div>
                <div className={styles.detailItem}>
                  <strong>Type:</strong>
                  {selectedType ? (
                    <div className={styles.typeButtonsContainer}>
                      <span className={styles.selectedType}>
                        {selectedType}
                      </span>
                      <button
                        className={styles.resetTypeButton}
                        onClick={() => {
                          setSelectedType(null);
                          handleTypeChange(selectedRequest._id, "");
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <div className={styles.typeOptions}>
                      <button
                        className={styles.typeButton}
                        onClick={() =>
                          handleTypeChange(selectedRequest._id, "long")
                        }
                      >
                        Long
                      </button>
                      <button
                        className={styles.typeButton}
                        onClick={() =>
                          handleTypeChange(selectedRequest._id, "short")
                        }
                      >
                        Short
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.detailItem}>
                  <strong>Description:</strong> {selectedRequest.description}
                </div>
                <div className={styles.detailItem}>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedRequest.createdAt).toLocaleDateString()}
                </div>
                <div className={styles.detailItem}>
                  <strong>Phone Number:</strong>{" "}
                  {selectedRequest.user
                    ? selectedRequest.user.phone_number
                    : "No phone number"}
                </div>
                <div className={styles.detailItem}>
                  <strong>Note:</strong> {selectedRequest.note || ""}
                </div>
                <div className={styles.detailItem}>
                  <strong>Status:</strong> {selectedRequest.status}
                </div>
                <div className={styles.detailItem}>
                  <strong>Image:</strong>{" "}
                  <img
                    src={selectedRequest.image_url || ""}
                    alt="Zoomable"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsZoomed(true)}
                  ></img>
                  {isZoomed && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                      }}
                      onClick={() => setIsZoomed(false)}
                    >
                      <img
                        src={selectedRequest.image_url || ""}
                        alt="Zoomed"
                        style={{ width: "60vw" }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.detailItem}>
                  <strong>Assigned Technician:</strong>{" "}
                  {selectedRequest.specialist?.specialist_name ||
                    "Not assigned"}
                </div>

                {selectedRequest.status === "pending" && (
                  <div className={styles.detailActions}>
                    <button
                      className={styles.acceptButton}
                      onClick={() => {
                        handleStatusChange(selectedRequest._id, "accepted");
                        handleBack();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className={styles.rejectButton}
                      onClick={() => {
                        handleStatusChange(selectedRequest._id, "rejected");
                        handleBack();
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}

            {showNotePopup && (
              <div className={styles.notePopupOverlay}>
                <div className={styles.notePopup}>
                  <h3>Add Note</h3>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note here..."
                  />
                  <div className={styles.notePopupButtons}>
                    <button
                      onClick={handleNoteSubmit}
                      className={styles.submitNoteButton}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setNewNote("");
                        setShowNotePopup(false);
                      }}
                      className={styles.cancelNoteButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Technician;
