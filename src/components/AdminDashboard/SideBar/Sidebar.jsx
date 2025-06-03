import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname; // Get the current path

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <div className={styles.header}>
        <img
          src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1746550701/DIVO-White_logo_cv7rq0.png"
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <nav className={styles.navbar}>
        <div className={styles.wrapper}>
          <div
            className={`${styles.navItem} ${
              location.pathname === "/dashboard" ? styles.active : ""
            }`}
            onClick={() => handleNavigation("/dashboard")}
          >
            <img
              src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748905889/deasgdimq6b17crvmsf5.png"
              alt="Dashboard"
              className={styles.icon}
            />
            <span>Dashboard</span>
          </div>
        </div>

        <div className={styles.settingsWrapper}>
          <div className={styles.navList}>
            <div
              className={`${styles.navItem} ${
                location.pathname === "/servicing" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/servicing")}
            >
              <img
                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748905996/rodp25ixcqswzfde6rbg.png"
                alt="Servicing"
                className={styles.icon}
              />
              <span>Servicing requests</span>
            </div>

            <div
              className={`${styles.navItem} ${
                location.pathname === "/accounting" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/accounting")}
            >
              <img
                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748906012/xni1a5ybvew00kszetzf.png"
                alt="Accounting"
                className={styles.icon}
              />
              <span>All Technicians</span>
            </div>

            <div
              className={`${styles.navItem} ${
                location.pathname === "/users" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/users")}
            >
              <img
                src="https://dashboard.codeparrot.ai/api/image/Z9EZLCppvFKitT90/group-10-2.png"
                alt="Users"
                className={styles.icon}
              />
              <span>Users</span>
            </div>

            <div
              className={`${styles.navItem} ${
                location.pathname === "/admin-repairshops" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/admin-repairshops")}
            >
              <img
                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748906031/gyw2aygxdt81gmknnnp6.png"
                alt="Repair"
                className={styles.icon}
              />
              <span>Repair Shops</span>
            </div>

            <div
              className={`${styles.navItem} ${
                location.pathname === "/winerrors" ? styles.active : ""
              }`}
              onClick={() => handleNavigation("/winerrors")}
            >
              <img
                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748906047/ojb8qiqakqsvwnhj2sa5.png"
                alt="Errors"
                className={styles.icon}
              />
              <span>Win errors</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
