import React, { useState, useRef, useEffect } from 'react';
import './ProfileDropdown.css';
import { useLogout } from '../../../Hooks/useLogout';
import { useNavigate } from 'react-router-dom'

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const navigate = useNavigate()
  const { logout } = useLogout()
  const handleClick = () => {
              logout()
                // Redirect after a short delay
              setTimeout(() => {
                      navigate('/login');
                  }, 1000);
          }

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/profile-page" className="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            Manage My Account
          </a>
          
          <a href="#" className="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25z" />
            </svg>
            My Requests
          </a>
          
          <a href="#" className="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
              <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            My Cancellations
          </a>
          
          <a href="#" className="menu-item" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
              <path d="M16 17v-3H9v-4h7V7l5 5-5 5z"/>
              <path d="M14 7v2H5v6h9v2l5-5-5-5z" fill="none" stroke="currentColor" strokeWidth="0"/>
              <path d="M12 3c-4.418 0-8 3.582-8 8v7c0 1.657 1.343 3 3 3h5c1.657 0 3-1.343 3-3v-7h-2"/>
            </svg>
            Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;